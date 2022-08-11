// const fs = require('fs/promises');
// const path = require('path');
//
// const sortBoys = async (readFolder, gender, writeFolder) => {
//     try {
//         const pathFolderToBoys = path.join(__dirname, readFolder);
//         const  files = await fs.readdir(path.join(pathFolderToBoys))
//         for (const file of files) {
//             const pathToFile = path.join(pathFolderToBoys, file);
//             const data = await fs.readFile(pathToFile);
//             const user = JSON.parse(data.toString());
//             if (user.gender !== gender) {
//                 await fs.rename(pathToFile, path.join(__dirname, writeFolder, file));
//             }
//         }
//     }catch(e) {
//         console.error(e);
//     }
// }
//
// const sortGirls = async () => {
//     try{
//         const pathFolderToGirls = path.join(__dirname, 'girls');
//         const docks = await fs.readdir(path.join(pathFolderToGirls))
//         for (const dock of docks) {
//             const pathToDock = path.join(pathFolderToGirls, dock);
//             const info = await fs.readFile(pathToDock);
//             const user = JSON.parse(info.toString());
//             if (user.gender !== 'female') {
//                 await fs.rename(pathToDock, path.join(__dirname, 'boys', dock));
//             }
//         }
//
//     }catch (e){
//         console.error(e);
//     }
// }
//
// sortBoys('boys', 'male', 'girls');
// sortGirls();

// SECOND TASK

const fs = require('fs/promises');
const path = require('path');

const reader = async (folderPath) => {
    const files = await fs.readdir(folderPath);

    for (const file of files) {
        const pathToFile = path.join(folderPath, file);
        const stat = await fs.stat(pathToFile);

        if (stat.isFile()) {
            await fs.rename(pathToFile, path.join(__dirname, 'folder', file));
        }

        if (stat.isDirectory()) {
            await reader(pathToFile);
        }
    }
}

reader(path.join(__dirname, 'folder'));
