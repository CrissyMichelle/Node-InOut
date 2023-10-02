const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf-8', (error, data) => {
        if (error) {
            console.error(`Error reading ${path}: ${error}`);
            return;
        }
        console.log(data);
    });
}

cat(process.argv[2])