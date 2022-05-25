const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let v = "";
rl.question("ENETR SOMETHING HERE :  ", (val) => {
  rl.close(); 
  v =  val;
});

console.log("V ::::: ", v);
