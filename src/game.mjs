import players from './players';

import {styleHighlight as hl} from './display';

const START = 0;
const GOAL = 63;
const THE_BRIDGE = 6;
const THE_BRIDGE_JUMP = 12;
const THE_GOOSE = [5, 9, 14, 18, 23, 27];

const START_LABEL = hl('Start');
const THE_BRIDGE_LABEL = `${hl('The')} ${hl('Bridge')}`;
const THE_GOOSE_LABEL = `${hl('The')} ${hl('Goose')}`;
const GOAL_LABEL = hl(GOAL);
const WIN_LABEL = hl('Wins!!');

export function label(playerPos) {
   if (playerPos == START) {
      return START_LABEL;
   } else if (playerPos == THE_BRIDGE) {
      return THE_BRIDGE_LABEL;
   } else if (THE_GOOSE.indexOf(playerPos) > -1) {
      return `${hl(playerPos)}, ${THE_GOOSE_LABEL}`;
   } else {
      return `${hl(playerPos)}`;
   }
}

export function action(playerName, roll1, roll2) {
   const playerLabel = hl(playerName)
   const playerPosOrig = players[playerName]
   let playerPos = playerPosOrig
   let output = `${playerLabel} rolls ${hl(roll1)}, ${hl(roll2)}. ${playerLabel} moves from ${label(playerPos)} to `
   playerPos += roll1 + roll2
   let continueTurn = true
   while (continueTurn) {
      if (playerPos == THE_BRIDGE) {
         output += `${THE_BRIDGE_LABEL}. ${playerLabel} jumps to `
         playerPos = THE_BRIDGE_JUMP
      } else if (THE_GOOSE.indexOf(playerPos) > -1) {
         output += `${label(playerPos)}. ${playerLabel} moves again and goes to `
         playerPos += roll1 + roll2
      } else if (playerPos == GOAL) {
         output += `${GOAL_LABEL}. ${playerLabel} ${WIN_LABEL}`
         continueTurn = false
      } else if (playerPos > GOAL) {
         playerPos = GOAL - (playerPos - GOAL)
         output += `${GOAL_LABEL}. ${playerLabel} bounces! ${playerLabel} returns to `
      } else {
         output += label(playerPos)
         continueTurn = false
      }
   }
   players[playerName] = playerPos
   for (let otherPlayerName in players) {
      if (otherPlayerName != playerName && players[otherPlayerName] == playerPos) {
         output += `. On ${label(playerPos)} there is ${label(otherPlayerName)}, who returns to ${label(playerPosOrig)}`
         players[otherPlayerName] = playerPosOrig
         return output
      }
   }
   return output
}

export function randomRoll() {
   return Math.floor(Math.random() * 5) + 1;
}

export default {
   label: label,
   action: action,
   randomRoll: randomRoll
};
