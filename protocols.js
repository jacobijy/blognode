const fs = require('fs');
const fsp = fs.promises;

let exportString = ''

const loadUpJson = async () => {
    const files = await fsp.readdir('./protocol/up');
    for (const file of files) {
        let filepre = file.split('.json')[0]
        exportString = `${exportString},\n\t${filepre}`
        await fsp.appendFile('./protocol/index.js', `import ${filepre} from './up/${file}'\n`)
    }
    // fs.readdir('./protocol/up', (err, files) => {
    //     files.map(value => {
    //         let filepre = value.split('.json')[0]
    //         exportString = `${exportString}, ${filepre}`
    //         fs.appendFile('./protocol/index.js', `import ${filepre} from './up/${value}'\n`, err => {
    //             console.log(err);
    //             fs.appendFile('./protocol/index.js', `\nexport default { ${exportString.slice(2)} }`, err => {
    //                 console.log(err);
    //             })
    //         })
    //     })
    // })
}

const loadDownJson = async () => {
    const files = await fsp.readdir('./protocol/down');
    for (const file of files) {
        let filepre = file.split('.json')[0]
        exportString = `${exportString},\n\t${filepre}`
        await fsp.appendFile('./protocol/index.js', `import ${filepre} from './down/${file}'\n`)
    }
}

const createIndex = async () => {
    try {
        await fsp.access('./protocol/index.js');
        await fsp.unlink('./protocol/index.js');
    } catch (err) {
        console.log('file dose not exist, create new');
    }
    await fsp.writeFile('./protocol/index.js', '');
    await loadDownJson();
    await loadUpJson();
    await fsp.appendFile('./protocol/index.js', `\nexport default {\n${exportString.slice(2)}\n}`)
}

createIndex().then(async result => {
    console.log((await fsp.readFile('./protocol/index.js')).toString());
});