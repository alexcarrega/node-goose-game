import Vorpal from 'vorpal';

import display from './display';
import {styleHighlight as hl, stylePrompt as prm, ARROW, NOT} from './display';

import game from './game';

import players from './players';

const prompt = `${prm('goose-game')} ${ARROW} `;

function _checkRoll(args, key) {
   if (!(key in args)) {
      return game.randomRoll();
   } else {
      const roll = parseInt(args[key]);
      if (roll < 1 || roll > 6) {
         display.error(`${hl(key)} value ${NOT} valid: ${hl(roll)}. Must be between ${hl(1)} and ${hl(6)}`);
         return false;
      } else {
         return roll;
      }
   }
}

const vorpal = Vorpal()
   .delimiter(prompt);

vorpal
   .on('client_prompt_submit', (text) => {
      if (text == 'exit') {
         display.text("Bye!!!");
      }
   });

vorpal
   .command(`add player [name]`, `Add new player`)
   .action(function (args, cb) {
      const playerName = args.name;
      const playerLabel = hl(playerName);
      if (args.name in players) {
         display.warn(`${playerLabel}: already existing player`);
      } else {
         players[playerName] = 0;
         display.info(`players: ${Object.keys(players).map(hl).join(', ')}`);
      }
      cb();
   });

vorpal
   .command(`move [player] [roll1], [roll2]`, `Make a move of a player`)
   .autocomplete({
      data: () => {
         return players.all()
      }
   })
   .action(function (args, cb) {
      const playerName = args.player;
      const playerLabel = hl(playerName);
      if (playerName in players) {
         const roll1 = _checkRoll(args, 'roll1');
         const roll2 = _checkRoll(args, 'roll2');
         if (roll1 !== false && roll2 !== false) {
            display.text(game.action(playerName, roll1, roll2));
         }
      } else {
         display.error(`Player ${playerLabel} ${NOT} found`);
      }
      cb();
   });

export default vorpal;
