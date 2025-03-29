const fs = require('fs');
const path = require('path');

function traverseDirectory(dirPath, indent = '') {
    // Read directory contents
    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
            // Print directory and recurse into it
            console.log(`${indent}📁 ${item}/`);
            traverseDirectory(fullPath, indent + '  ');
        } else {
            // Print file
            console.log(`${indent}📄 ${item}`);
        }
    });
}

// Get directory path from command line or use current directory
const dirPath = process.argv[2] || './';

console.log(`Directory tree for: ${path.resolve(dirPath)}`);
traverseDirectory(dirPath);