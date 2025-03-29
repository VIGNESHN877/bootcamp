// this code line use for a reverse string 

// this is a comment line arguments the args [0]
//  this line use for a path to node.js file  executable  ,
//  args[1]  path to my file script file  ,
//  args [2] your actual command line arguments line 


const args = process.argv;

// argument exist (node, script name and i input for a script)

if (args.length < 3) {

    console.log('Please provide a string to reverse as commend line arguments');
    process.exit(1); // this line use for a exit the process with a error code line 

}

const inputString = args[2]; // this line code is input line string for (argument start for a  index )
/*this a string line a  using for a multi line comment 
first split the string  into an array of characters
and next step is a reverse the arrays and join the array back into a string*/

const reversedString = inputString.split('').reverse().join(''); // this line is input line string for (argument start for a index) "give string word"

console.log(reversedString); // this line use for a print a reversed string to console using for code 