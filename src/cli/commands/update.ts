import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { createTwoFilesPatch } from 'diff';
import { loadConfig, saveConfig } from '../utils/config.js';
import { fetchRegistry, fetchLocalRegistry, getComponent } from '../utils/registry.js';
import { rewriteImports, computeComponentHash } from '../utils/installer.js';

export const updateCommand = new Command('update')
  .description('Update installed components to the latest registry version')
  .argument('[components...]', 'component names to update (defaults to all)')
  .option('--local', 'use local registry (development)')
  .option('--all', 'update all installed components')
  .option('--force', 'overwrite without confirmation')
  .option('--dry-run', 'show what would be updated without applying')
  .action(
    async (
      componentNames: string[],
      options: { local?: boolean; all?: boolean; force?: boolean; dryRun?: boolean },
    ) => {
      const cwd = process.cwd();
      const config = await loadConfig(cwd);

      const spinner = ora('Fetching registry...').start();

      let registry;
      try {
        registry = options.local
          ? await fetchLocalRegistry()
          : await fetchRegistry(config.registry);
      } catch {
        spinner.fail('Failed to fetch registry.');
        return;
      }

      spinner.stop();

      // Determine which components to update
      let slugs = componentNames;
      if (options.all || slugs.length === 0) {
        slugs = Object.keys(config.installed);
      }

      if (slugs.length === 0) {
        console.log(chalk.dim('No installed components to update.'));
        return;
      }

      const sourceDir = path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        '../../..',
      );

      let updatedCount = 0;

      for (const slug of slugs) {
        const component = getComponent(registry, slug);
        if (!component) {
          console.log(chalk.yellow(`⚠ Component "${slug}" not found in registry.`));
          continue;
        }

        const installedInfo = config.installed[slug];
        if (!installedInfo) {
          console.log(chalk.yellow(`⚠ Component "${slug}" is not installed.`));
          continue;
        }

        // Check if local files were modified
        const currentHash = await computeComponentHash(component, config, cwd);
        const locallyModified = installedInfo.hash && currentHash !== installedInfo.hash;

        // Check each file for differences
        let hasChanges = false;
        const fileDiffs: Array<{
          relativePath: string;
          localContent: string;
          registryContent: string;
        }> = [];

        for (const file of component.files) {
          const relativePath = file.replace(/^src\/components\//, '');
          const localPath = path.join(cwd, config.componentDir, relativePath);
          const registryPath = path.join(sourceDir, file);

          if (!(await fs.pathExists(registryPath))) continue;

          const registryContent = await fs.readFile(registryPath, 'utf-8');
          const rewritten = rewriteImports(registryContent, config);

          const localContent = (await fs.pathExists(localPath))
            ? await fs.readFile(localPath, 'utf-8')
            : '';

          if (localContent !== rewritten) {
            hasChanges = true;
            fileDiffs.push({ relativePath, localContent, registryContent: rewritten });
          }
        }

        if (!hasChanges) {
          continue;
        }

        // Show diff
        console.log();
        const versionLabel =
          installedInfo.version !== component.version
            ? `${installedInfo.version} → ${component.version}`
            : component.version;
        console.log(chalk.bold(`${slug} (${versionLabel})`));

        if (locallyModified) {
          console.log(chalk.yellow('  ⚠ This component has been modified locally.'));
        }

        for (const { relativePath, localContent, registryContent } of fileDiffs) {
          const patch = createTwoFilesPatch(
            `local/${relativePath}`,
            `registry/${relativePath}`,
            localContent,
            registryContent,
          );

          for (const line of patch.split('\n')) {
            if (line.startsWith('+') && !line.startsWith('+++')) {
              console.log(chalk.green(line));
            } else if (line.startsWith('-') && !line.startsWith('---')) {
              console.log(chalk.red(line));
            } else if (line.startsWith('@@')) {
              console.log(chalk.cyan(line));
            }
          }
        }

        if (options.dryRun) {
          console.log(chalk.dim('  (dry run — not applied)'));
          continue;
        }

        // Confirm
        if (!options.force) {
          const { confirm } = await prompts({
            type: 'confirm',
            name: 'confirm',
            message: `Update ${slug}?`,
            initial: !locallyModified,
          });

          if (!confirm) {
            console.log(chalk.dim('  Skipped.'));
            continue;
          }
        }

        // Apply update
        const updateSpinner = ora(`Updating ${slug}...`).start();
        try {
          for (const { relativePath, registryContent } of fileDiffs) {
            const destPath = path.join(cwd, config.componentDir, relativePath);
            await fs.ensureDir(path.dirname(destPath));
            await fs.writeFile(destPath, registryContent, 'utf-8');
          }

          // Update config
          const newHash = await computeComponentHash(component, config, cwd);
          config.installed[slug] = {
            version: component.version,
            hash: newHash,
            installedAt: new Date().toISOString().split('T')[0],
          };

          updateSpinner.succeed(`Updated ${slug} to ${component.version}`);
          updatedCount++;
        } catch (error) {
          updateSpinner.fail(`Failed to update ${slug}: ${(error as Error).message}`);
        }
      }

      if (updatedCount > 0) {
        await saveConfig(config, cwd);
        console.log();
        console.log(chalk.green('✔'), chalk.bold(`${updatedCount} component(s) updated.`));
      } else if (!options.dryRun) {
        console.log(chalk.green('✔ All components are up to date.'));
      }
    },
  );
