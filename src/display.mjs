import $ from 'chalk';

export const NOT = 'NOT';
export const NEW_LINE = `\n`;
export const ARROW = $.cyan('>>>');

export const styleInfo = text => $.magenta(text);
export const styleWarn = text => $.yellow(text);
export const styleError = text => $.red(text);

export const styleHead = text => $.green(text);
export const stylePrompt = text => $.cyan.bold(text);
export const styleText = text => $.white(text);

export const styleHighlight = text => $.bold(text);

export const info = text => console.log(NEW_LINE + styleInfo(text) + NEW_LINE);
export const warn = text => console.log(NEW_LINE + styleWarn(text) + NEW_LINE);
export const error = text => console.log(NEW_LINE + styleError(text + NEW_LINE));

export const head = text => console.log(NEW_LINE + styleHead(text) + NEW_LINE);
export const text = text => console.log(NEW_LINE + styleText(text) + NEW_LINE);


export default {
   style: {
      info: styleInfo,
      warn: styleWarn,
      error: styleError,
      head: styleHead,
      prompt: stylePrompt,
      text: styleText,
      highlight: styleHighlight
   },

   info: info,
   warn: warn,
   error: error,
   head: head,
   text: text,
};
