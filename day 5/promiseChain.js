
//this a commend is  a file paths commends 

const fs = require('fs').promises;

const path = require('path');

// this line user for a process content function for ( exmple transformations)
const inputFile = path.join(__dirname, 'input.txt');

const outputFile = path.join(__dirname, 'output.txt');


function processContent(content) {


    return content

           .toUpperCase()   // convert to uppercase

           .split('\n')   // this line user for a split into a line 

           .map((line, index) => `${index +1}: ${line}`)  // this a user for a add line number

           .join('\n');   // there are join back with a newlines user for a commend line 

}
 // this promise chain

fs.readFile(inputFile, 'utf8')

// this promise content for a code for use for file read successfully 
   .then(content => {
    console.log('1.File read sucessfully');
    return processContent(content);

    })
// this commend line user for a content processed successfully that are user for function line
    .then(processedContent => {
        console.log('2.Content processed successfully');
        return fs.writeFile(outputFile, processedContent);
   })

   // this line user for a processed content write 
   .then(() => {
        console.log('3.Processed content write to output file');
        return fs.readFile(outputFile, 'utf8');
    })

    .then(fileContent => {
        console.log('4.verifying the  output file');
        console.log('--- Output File Content ---');
        console.log(fileContent);
        console.log('---------------------------');
    })

    .catch(error => {

        console.error('Error in promise chain:', error);
    })

    .finally(() => {
    
        console.log('5. Operation completed (successful or with errors)');

    });