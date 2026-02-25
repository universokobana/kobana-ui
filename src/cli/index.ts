import { Command } from 'commander';

const program = new Command();

program
  .name('kobana-ui')
  .description('Kobana Design System CLI')
  .version('0.1.0');

program.parse();
