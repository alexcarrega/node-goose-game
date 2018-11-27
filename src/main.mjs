import commands from './commands';
import {head, styleHighlight as hl} from './display';

head(`Welcome to the ${hl('The Goose Game Kata')}`)
commands.show();
