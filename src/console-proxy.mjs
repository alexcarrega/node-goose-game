import console2 from 'console2';
import $ from 'chalk';

const console2obj = console2({ disableWelcome: true, override: false });

console2obj.ARROW = " => ";
console2obj.ASSIGN = ": ";

console2obj.head = title => console2obj
   .title(console2obj.col(title, 'rainbow'));

console2obj.section = title => console2obj
   .spacer()
   .title(console2obj.col(title, 'rainbow'));

console2obj.text = message => console2obj.log(console2obj.col(message, 'white'));

console2obj.keyValue = (type, key, value, sep = console2obj.ASSIGN) =>
   console2obj[type](`${$.blue(key)}${sep}${$.cyan(value)}`);

export default console2obj;
