// this a table print code 
// this comment-line argument (process.argv contains all arguments)


const args = process.argv;

// this line use for a check if  number was provided (at least 3 arguments; node, script number )

if (args.length < 3) {
  console.error("Usage: node table_print.js <number_of_rows> <number_of_columns> <fill_character>");
  process.exit(1); // this line  use for  a exit  with error code check line 
}

// this line extract the input (first the input argument script name value )
const inputNumber = args [2];

// this line  convert the input a number 
const number = parseFloat(inputNumber);

// this a line use for a validate the input is actually a number 
if (isNaN(number)) {
    console.error("Please provide a valid  number.");
    process.exit(1);
}

// this  a line print a table header with a multiplication table

console.log(`Multiplication Table: ${number}`);

// this a loop line for table use for 1 t0 10 to generate the table
for (let i = 0; i <= 10; i++) {

    // this line print a row of the table with a multiplication result
    const product = number * i ;
    // this line use for a format the output to two decimal places and add a fill character for alignment
     console.log(`${i} * ${number} = ${product}`); // give to the input  for a file name  table.js some number input value 
}