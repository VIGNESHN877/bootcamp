const args = process.argv; // this line use for a comment line argument using  process . argv

const num1 = parseFloat(args[2]);  // this line use for a the third and fourth argument (first argument two are Node path and script path path)
 const num2 = parseFloat(args[3]);
  

     // this line code use for a check if both arguments are valid numbers
 if (isNaN(num1) || isNaN(num2)) {
  console.error('Error Please provide two valid number as arguments');
  process.exit(1);  // this line is exit with the error code 
 }



 const sum = num1 + num2; // this line is calculate the sum 


 console.log(`The sum of ${num1} is ${num2} is ${sum}`); // print the result

// this is a program use for two input values
 // give a input for a command-line.js and give a input value 