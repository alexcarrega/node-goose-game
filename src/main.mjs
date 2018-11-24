import Vorpal from 'vorpal';
import console from './console-proxy';

const players = {};

const START = 0;
const GOAL = 63;
const THE_BRIDGE = 6;
const THE_BRIDGE_JUMP = 12;
const THE_GOOSE = [5, 9, 14, 18, 23, 27];

function label(position) {
   if (position == 0) {
      return "Start";
   } else if (position == THE_BRIDGE) {
      return "The Bridge";
   } else if (THE_GOOSE.indexOf(position) > -1) {
      return `${position}, The Goose`;
   } else {
      return `${position}`;
   }
}

function action(player, rolls, oldPosition) {
   const position = players[player];
   let output = "";
   if (position == THE_BRIDGE) {
      players[player] = THE_BRIDGE_JUMP;
      output = `${label(THE_BRIDGE)}. ${player} jumps to ${label(THE_BRIDGE_JUMP)}`;
   } else if (THE_GOOSE.indexOf(position) > -1) {
      players[player] += rolls;
      output = `${label(position)}. ${player} moves again and goes to ${label(players[player])}`;
   } else if (position == GOAL) {
      output = `${label(GOAL)}. ${player} Wins!!`;
   } else if (position > GOAL) {
      players[player] = GOAL - (position - GOAL);
      output = `${label(GOAL)}. ${player} bounces! ${player} returns to ${label(players[player])}`;
   } else {
      output = `${label(position)}`;
   }
   for (let otherPlayer in players) {
      if (otherPlayer != player && players[otherPlayer] == players[player]) {
         output += `. On ${label(players[player])} there is ${otherPlayer}, who returns to ${label(oldPosition)}`;
         players[otherPlayer] = oldPosition;
         break;
      }
   }
   return output;
}

function turnIsFinish(player) {
   const position = players[player];
   if (position == START) {
      return true;
   } else if (position == THE_BRIDGE) {
      return false;
   } else if (THE_GOOSE.indexOf(position) > -1) {
      return false;
   } else {
      return true;
   }
}

function randomRoll() {
   return Math.floor(Math.random() * 5) + 1;
}

const vorpal = Vorpal();

vorpal
   .command('add player <name>', 'Add new player')
   .action(function (args, cb) {
      if (args.name in players) {
         console.warn(`${args.name}: already existing player`);
      } else {
         players[args.name] = 0;
         console.info(`players: ${Object.keys(players).join(', ')}`);
      }
      cb();
   });

vorpal
   .command('move <player> [roll1], [roll2]', 'Make a move of a player')
   .action(function (args, cb) {
      if (!(args.player in players)) {
         console.error(`Player ${args.player} not found`);
      } else {
         if (!('roll1' in args)) {
            args.roll1 = randomRoll();
         }
         if (!('roll2' in args)) {
            args.roll2 = randomRoll();
         }
         args.roll1 = parseInt(args.roll1);
         args.roll2 = parseInt(args.roll2);
         const rolls = args.roll1 + args.roll2;
         let output = `${args.player} rolls ${args.roll1}, ${args.roll2}. ${args.player} moves from ${label(players[args.player])} to `;
         const oldPosition = players[args.player];
         players[args.player] += rolls;
         do {
            output += action(args.player, rolls, oldPosition);
         } while (!turnIsFinish(args.player));
         console.text(output);
      }
      cb();
   });

vorpal
   .delimiter(console.col('goose-game: ', 'rainbow'))
   .show();
