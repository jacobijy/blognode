const fs = require('fs');
const fsp = fs.promises;

let exportString = ''

const loadUpJson = () => {
    fs.readdir('./protocol/up', (err, files) => {
        files.map(value => {
            let filepre = value.split('.json')[0]
            exportString = `${exportString}, ${filepre}`
            fs.appendFile('./protocol/index.js', `import ${filepre} from './up/${value}'\n`, err => {
                console.log(err);
                fs.appendFile('./protocol/index.js', `\nexport default { ${exportString.slice(2)} }`, err => {
                    console.log(err);
                })
            })
        })
    })
}

const loadDownJson = () => {
    fs.readdir('./protocol/down', (err, files) => {
        files.map(value => {
            let filepre = value.split('.json')[0]
            exportString = `${exportString}, ${filepre}`
            fs.appendFile('./protocol/index.js', `import ${filepre} from './down/${value}'\n`, err => {
                console.log(err);
            })
        })
    })
}

const createIndex = () => {
    const access = fsp.access('./protocol/index.js');
    const unlink = fsp.unlink('./protocol/index.js');
    const write = fsp.writeFile('./protocol/index.js', '');
    access.then(result => {
        return unlink
    }).then(result => {
        return write
    }).then(result => {
        loadUpJson();
        loadDownJson();
    }).then(result => {
    })
}

createIndex();