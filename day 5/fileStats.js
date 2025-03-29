const fs = require(`fs`);
const path = require('path');


// this line use for a get a file path command line argument

const filePath = process.argv[2];

if (!filePath) {

    console.error('Please provide a file path as a command line argument.');

    process.exit(1);

}
try { 
    // tis line use for file get stats synchronously 

    const stats = fs.statSync(filePath);

    // this line use for extract required  a infromation
    const size = stats.size; // this line use for creation date

    const creationDate = stats.birthtime; // last modification date

    const modifiedDate = stats.mtime; // file type last modification date

    // this line use for print all required information about file

    console.log(`File Statistic for : ${path.basename(filePath)}`);

    console.log(` - Size: ${size} bytes`);

    console.log(` -  Created : ${creationDate}`);

    console.log(`- Last Modified : ${modifiedDate}`);

    } catch (error) {

        console.error(`Error reading file stats: ${error.message}`);

    } // this is a print statement use for run to node fileStats.js file name run to the program
    
