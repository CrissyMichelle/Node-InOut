const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf-8', (error, data) => {
        if (error) {
            console.error(`Error reading ${path}: ${error}`);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webcat(url) {   
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.error(`Error fetching ${url}: ${error}`);
        process.exit(1);
    }
}

async function writeCat(fileName, pathOrURL) {
    let content;

    try {
        content = fs.readFileSync(pathOrURL, 'utf-8');
    } catch (error) {
        try {
            const response = await axios.get(pathOrURL);
            content = response.data;
        } catch (error) {
            console.error(`Error fetching ${pathOrURL}: ${error}`);
            process.exit(1);
        }
    }

    try {
        fs.writeFileSync(fileName, content);
        console.log('Successfully wrote to file!');
    } catch (error) {
        console.error(`File write failed: ${error}`);
        process.exit(1);
    }
}

if (process.argv[2] === '--out') {
    const fileName = process.argv[3];
    const pathOrUrl = process.argv[4];

    writeCat(fileName, pathOrUrl);
} else {
    const path = process.argv[2];

    if(path.startsWith('http://') || path.startsWith('https://'))  {
        webcat(path);
    } else {
        cat(path);
    }
}