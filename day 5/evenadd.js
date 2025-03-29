// this use for a comment line use a comment-line argument




const number = parseInt(process.argv[2]); 

// this line use for a check if the number is a valid number 

if (isNaN(number)) {
  console.error('Please provide a valid number as an argument.');
  process.exit(1);
}

// this line use for a check if the number is even or odd
if (number % 2 === 0) { 
    console.log(`EVEN`);

} else {
    console.log(`ODD`); // give a some number ep 3 or 2 output is even or odd.
}
// this line use for print input terminal input node evenodd.js and enter some input value 