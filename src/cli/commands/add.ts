import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import path from 'path';
import { loadConfig, saveConfig } from '../utils/config.js';
import { fetchRegistry, fetchLocalRegistry } from '../utils/registry.js';
import { resolveDependencies } from '../utils/resolver.js';
import { installComponent, installShadcnDeps, installNpmDeps, computeComponentHash } from '../utils/installer.js';

export const addCommand = new Command('add')
  .description('Add kobana components to your project')
  .argument('<components...>', 'component names to add')
  .option('--local', 'use local registry (development)')
  .option('-y, --yes', 'skip confirmation')
  .action(async (componentNames: string[], options: { local?: boolean; yes?: boolean }) => {
    const cwd = process.cwd();
    const config = await loadConfig(cwd);

    // Fetch registry
    const spinner = ora('Resolving dependencies...').start();

    let registry;
    try {
      registry = options.local
        ? await fetchLocalRegistry()
        : await fetchRegistry(config.registry);
    } catch {
      spinner.fail('Failed to fetch registry.');
      console.log(
        chalk.dim('If developing locally, use --local flag to use the local registry.'),
      );
      return;
    }

    // Resolve dependencies
    let resolved;
    try {
      resolved = resolveDependencies(componentNames, registry, config.installed);
    } catch (error) {
      spinner.fail(`Failed to resolve dependencies: ${(error as Error).message}`);
      return;
    }

    spinner.stop();

    if (resolved.kobana.length === 0 && resolved.shadcn.length === 0 && resolved.npm.length === 0) {
      console.log(chalk.green('✔'), 'All components are already installed.');
      return;
    }

    // Show what will be installed
    console.log();
    console.log(chalk.bold('Will be installed:'));
    if (resolved.shadcn.length > 0) {
      console.log(chalk.dim('  shadcn:'), resolved.shadcn.join(', '));
    }
    if (resolved.kobana.length > 0) {
      console.log(
        chalk.dim('  kobana:'),
        resolved.kobana.map((k) => k.slug).join(', '),
      );
    }
    if (resolved.npm.length > 0) {
      console.log(chalk.dim('  npm:'), resolved.npm.join(', '));
    }
    console.log();

    // Confirm
    if (!options.yes) {
      const { confirm } = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: 'Continue?',
        initial: true,
      });

      if (!confirm) {
        console.log(chalk.red('Cancelled.'));
        return;
      }
    }

    // Install shadcn deps
    if (resolved.shadcn.length > 0) {
      const shadcnSpinner = ora(`Installing shadcn components: ${resolved.shadcn.join(', ')}`).start();
      try {
        await installShadcnDeps(resolved.shadcn, cwd);
        shadcnSpinner.succeed(`shadcn: ${resolved.shadcn.join(', ')}`);
      } catch {
        shadcnSpinner.warn(`shadcn installation failed — you may need to install manually.`);
      }
    }

    // Install npm deps
    if (resolved.npm.length > 0) {
      const npmSpinner = ora(`Installing npm packages: ${resolved.npm.join(', ')}`).start();
      try {
        await installNpmDeps(resolved.npm, cwd);
        npmSpinner.succeed(`npm: ${resolved.npm.join(', ')}`);
      } catch {
        npmSpinner.warn(`npm installation failed — you may need to install manually.`);
      }
    }

    // Copy kobana component files
    // Determine the source directory (the kobana-ui repo root)
    const sourceDir = path.resolve(
      path.dirname(new URL(import.meta.url).pathname),
      '../../..',
    );

    for (const { slug, component } of resolved.kobana) {
      const componentSpinner = ora(`Adding ${slug}...`).start();
      try {
        await installComponent(component, slug, config, sourceDir, cwd);
        const hash = await computeComponentHash(component, config, cwd);
        config.installed[slug] = {
          version: component.version,
          hash,
          installedAt: new Date().toISOString().split('T')[0],
        };
        componentSpinner.succeed(
          `kobana: ${slug} → ${config.componentDir}/composites/${slug}/`,
        );
      } catch (error) {
        componentSpinner.fail(`Failed to install ${slug}: ${(error as Error).message}`);
      }
    }

    // Save updated config
    await saveConfig(config, cwd);

    console.log();
    console.log(
      chalk.green('✔'),
      chalk.bold(`${resolved.kobana.length} component(s) added.`),
    );
  });
