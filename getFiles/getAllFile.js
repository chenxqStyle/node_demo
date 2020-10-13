/* eslint-disable no-console */
const fs = require('fs')
const join = require('path').join;

function findSync(startPath) {

    let result = [];

    function finder(path) {

        let files = fs.readdirSync(path);

        // 名称去空格
        // for (let i = 0; i < files.length; i++) {
        //     fs.readFile(`${path}/${files[i]}`, function(err, data) {
        //         let newname = files[i].replace(/\s/g, '')
        //         console.log(newname)
        //         fs.rename(`${path}/${files[i]}`, `${path}/${newname}`, (err) => {
        //             if (err) throw err;
        //             console.log('重命名完成');
        //         })
        //     })
        // }

        files.forEach((val, index) => {

            let fPath = join(path, val);

            let stats = fs.statSync(fPath);

            if (stats.isDirectory()) finder(fPath);


            // if(stats.isFile()) result.push(fPath);
            // 
            if (stats.isFile()) {
                let str = `[${val}](${fPath})\n`
                write(str)
                // result.push(str)
            }

        });
    }

    finder(startPath);

    // write(result)

    return result;

}


function write(data) {
    fs.writeFile('./index.md', data, { flag: 'a', encoding: 'utf-8', mode: '0666' }, function(err) {
        if (err) {
            console.log("文件写入失败")
        } else {
            console.log("文件写入成功");

        }

    })
}

let fileNames = findSync('../review1/');

// console.log(fileNames)