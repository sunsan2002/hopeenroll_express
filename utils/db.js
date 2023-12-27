/*
 * @Author: sunsan 2390864551@qq.com
 * @Date: 2023-11-26 21:27:57
 * @LastEditors: sunsan 2390864551@qq.com
 * @LastEditTime: 2023-11-26 21:46:29
 * @FilePath: \express-demo\utils\db.js
 * @Description: 数据库配置
 */
const mysql = require('mysql');

const config = {
    database:'hopeenroll',
    user:'root',
    password:'123456'
}

exports.db = (sql,sqlParams) => {
    sqlParams = sqlParams || [];
    return new Promise((resolve,reject) => {
        const pool = mysql.createPool(config);
        pool.getConnection((err,connection) => {
            if(err) {
                console.log(err)
                reject(err);
            } else {
                connection.query(sql,sqlParams,(e,results) => {
                    if(e) {
                        console.log(e)
                        reject(e);
                    } else {
                        resolve(results);
                        connection.destroy()
                    }
                })
            }
        })
    })
}