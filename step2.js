const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf-8', (error, data) => {
        if (error) {
            console.error(`Error reading ${path}: ${error}`);
            return;
        }
        console.log(data);
    });
}

function webcat(url) {   
    axios.get(url)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(`Error fetching ${url}: ${error}`);
        });
}

const path = process.argv[2];

if(path.startsWith('http://') || path.startsWith('https://'))  {
    webcat(path);
} else {
    cat(path);
}