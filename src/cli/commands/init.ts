import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { getDefaultConfig, saveConfig } from '../utils/config.js';

export const initCommand = new Command('init')
  .description('Initialize @kobana/ui in your project')
  .action(async () => {
    const cwd = process.cwd();

    // Check if already initialized
    if (await fs.pathExists(path.join(cwd, 'kobana.json'))) {
      console.log(chalk.yellow('⚠ kobana.json already exists. Project is already initialized.'));
      return;
    }

    // Detect shadcn
    const hasShadcn = await fs.pathExists(path.join(cwd, 'components.json'));

    if (hasShadcn) {
      console.log(chalk.green('✔ shadcn/ui detected'));
    } else {
      console.log(chalk.yellow('⚠ shadcn/ui not detected. You may need to set it up first.'));
    }

    // Validate base dependencies
    const pkgJsonPath = path.join(cwd, 'package.json');
    if (await fs.pathExists(pkgJsonPath)) {
      const pkgJson = await fs.readJSON(pkgJsonPath);
      const allDeps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
      const missing: string[] = [];
      if (!allDeps['react']) missing.push('react');
      if (!allDeps['tailwindcss']) missing.push('tailwindcss');
      if (missing.length > 0) {
        console.log(
          chalk.yellow(`⚠ Missing recommended dependencies: ${missing.join(', ')}`),
        );
        console.log(chalk.dim('  @kobana/ui components require React and Tailwind CSS.'));
      }
    }

    // Interactive prompts
    const response = await prompts([
      {
        type: 'text',
        name: 'componentDir',
        message: 'Where are your components?',
        initial: 'src/components',
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Use TypeScript?',
        initial: true,
      },
      {
        type: 'text',
        name: 'alias',
        message: 'Import alias for kobana components?',
        initial: '@/components/kobana',
      },
    ]);

    if (!response.componentDir) {
      console.log(chalk.red('Cancelled.'));
      return;
    }

    const config = getDefaultConfig();
    config.componentDir = `${response.componentDir}/kobana`;
    config.typescript = response.typescript;
    config.alias = response.alias;

    const spinner = ora('Creating project structure...').start();

    try {
      // Create directories
      const dirs = ['composites', 'templates', 'hooks', 'tokens'];
      for (const dir of dirs) {
        await fs.ensureDir(path.join(cwd, config.componentDir, dir));
      }

      // Save config
      await saveConfig(config, cwd);

      spinner.succeed('Project initialized!');
      console.log();
      console.log(chalk.green('✔'), 'Created', chalk.bold('kobana.json'));
      for (const dir of dirs) {
        console.log(chalk.green('✔'), 'Created', chalk.dim(`${config.componentDir}/${dir}/`));
      }
      console.log();
      console.log('Next: run', chalk.cyan('npx @kobana/ui add <component>'), 'to add components.');
    } catch (error) {
      spinner.fail('Failed to initialize.');
      throw error;
    }
  });
