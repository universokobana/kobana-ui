import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { loadConfig } from '../utils/config.js';
import { fetchRegistry, fetchLocalRegistry, listComponents } from '../utils/registry.js';

export const listCommand = new Command('list')
  .description('List all available kobana components')
  .option('--local', 'use local registry (development)')
  .action(async (options: { local?: boolean }) => {
    let config;
    try {
      config = await loadConfig();
    } catch {
      // No config file — show all as not installed
      config = null;
    }

    const spinner = ora('Fetching registry...').start();

    let registry;
    try {
      registry = options.local
        ? await fetchLocalRegistry()
        : config
          ? await fetchRegistry(config.registry)
          : await fetchLocalRegistry();
    } catch {
      spinner.fail('Failed to fetch registry.');
      return;
    }

    spinner.stop();

    const components = listComponents(registry);
    const installed = config?.installed || {};

    // Group by category
    const groups: Record<string, typeof components> = {};
    for (const comp of components) {
      const cat = comp.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(comp);
    }

    const categoryLabels: Record<string, string> = {
      composite: 'Composites',
      template: 'Templates',
      hook: 'Hooks',
      token: 'Tokens',
    };

    const categoryOrder = ['composite', 'template', 'hook', 'token'];

    for (const cat of categoryOrder) {
      const items = groups[cat];
      if (!items || items.length === 0) continue;

      console.log();
      console.log(chalk.bold(categoryLabels[cat] || cat) + ':');

      for (const comp of items) {
        const isInstalled = !!installed[comp.slug];
        const icon = isInstalled ? chalk.green('✔') : chalk.dim('○');
        const name = isInstalled ? chalk.white(comp.slug) : chalk.dim(comp.slug);
        const padded = comp.slug.padEnd(20);

        console.log(`  ${icon} ${isInstalled ? chalk.white(padded) : chalk.dim(padded)} ${chalk.dim(comp.description)}`);
      }
    }

    console.log();
  });
