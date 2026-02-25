import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { diffCommand } from './commands/diff.js';
import { updateCommand } from './commands/update.js';

const program = new Command();

program
  .name('kobana-ui')
  .description('Kobana Design System CLI')
  .version('0.1.0');

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(diffCommand);
program.addCommand(updateCommand);

program.parse();
