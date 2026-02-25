import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { createTwoFilesPatch } from 'diff';
import { loadConfig } from '../utils/config.js';
import { fetchRegistry, fetchLocalRegistry, getComponent } from '../utils/registry.js';

export const diffCommand = new Command('diff')
  .description('Show differences between local and registry versions of components')
  .argument('[components...]', 'component names to diff (defaults to all installed)')
  .option('--local', 'use local registry (development)')
  .option('--all', 'diff all installed components')
  .action(async (componentNames: string[], options: { local?: boolean; all?: boolean }) => {
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

    // Determine which components to diff
    let slugs = componentNames;
    if (options.all || slugs.length === 0) {
      slugs = Object.keys(config.installed);
    }

    if (slugs.length === 0) {
      console.log(chalk.dim('No installed components to diff.'));
      return;
    }

    // Determine source dir for registry files
    const sourceDir = path.resolve(
      path.dirname(new URL(import.meta.url).pathname),
      '../../..',
    );

    let hasDiffs = false;

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

      // Compare each file
      for (const file of component.files) {
        const relativePath = file.replace(/^src\/components\//, '');
        const localPath = path.join(cwd, config.componentDir, relativePath);
        const registryPath = path.join(sourceDir, file);

        if (!(await fs.pathExists(localPath))) {
          console.log(chalk.yellow(`  Missing locally: ${relativePath}`));
          hasDiffs = true;
          continue;
        }

        if (!(await fs.pathExists(registryPath))) {
          continue; // Source file doesn't exist — skip
        }

        const localContent = await fs.readFile(localPath, 'utf-8');
        const registryContent = await fs.readFile(registryPath, 'utf-8');

        if (localContent !== registryContent) {
          hasDiffs = true;
          const versionInfo = installedInfo.version !== component.version
            ? ` (local: ${installedInfo.version} → registry: ${component.version})`
            : '';

          console.log();
          console.log(chalk.bold(`${slug}${versionInfo}`));

          const patch = createTwoFilesPatch(
            `local/${relativePath}`,
            `registry/${relativePath}`,
            localContent,
            registryContent,
          );

          // Colorize the diff output
          for (const line of patch.split('\n')) {
            if (line.startsWith('+') && !line.startsWith('+++')) {
              console.log(chalk.green(line));
            } else if (line.startsWith('-') && !line.startsWith('---')) {
              console.log(chalk.red(line));
            } else if (line.startsWith('@@')) {
              console.log(chalk.cyan(line));
            } else {
              console.log(chalk.dim(line));
            }
          }
        }
      }
    }

    if (!hasDiffs) {
      console.log(chalk.green('✔ All components are up to date.'));
    }
  });
