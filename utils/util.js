/* 封装文件 */

const fs = require('fs');

module.exports = {
    read:(url) => {
        return new Promise((resolve, reject) => {
            fs.readFile(url, (err, data) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                resolve(data)
            })
        })
    }
}