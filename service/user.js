/*
 * @Author: sunsan 2390864551@qq.com
 * @Date: 2023-11-27 21:29:23
 * @LastEditors: sunsan 2390864551@qq.com
 * @LastEditTime: 2023-12-27 15:34:35
 * @FilePath: \express-demo\service\user.js
 * @Description: 用户的数据持久化操作
 */

const { db } = require('../utils/db')
const jwt = require('jsonwebtoken')
const config = require('../config')
const Result = require('../utils/result')
const XLSX = require('xlsx');
const getResult = require('../utils/getResult')


const userService = {
    //根据id查找用户
    getUserByID: async (req, res) => {
        const use = req.user
        const id = use.id;
        const sql = `select id,name,class,apply,username from user where id = ?`;
        const user = await db(sql, id)
        return res.send(Result.success(user))
    },
    //添加用户信息
    addUser: async (req, res) => {
        const user = req.user
        // const sql = 'insert into user set ?';
        // const data = await db(sql, user)
        return res.send(Result.success())
    },
    //更改用户信息
    updateUser: async (req, res) => {
        try {
            const use = req.user
            const arr = req.body
            const { select, answer } = arr
            let data
            const sql1 = `update user set apply=apply+1 where id = ?`;
            const sql2 = `update user set select${select} = ? where id = ?`;
            const sql3 = `select select1,select2,select3,select4 from user where id = ?`;
            data = await db(sql2, [answer, use.id])
            let updateUser = await db(sql3, use.id)
            updateUser = updateUser[0]
            if(updateUser.select1&&updateUser.select2&&updateUser.select3&&updateUser.select4){
                await db(sql1, use.id)
                return res.send(Result.success("您已完成所有测试", {state1: updateUser.select1?true:false, state2: updateUser.select2?true:false, state3: updateUser.select3?true:false, state4: updateUser.select4?true:false}))
            }
            return res.send(Result.success("提交成功", {state1: updateUser.select1?true:false, state2: updateUser.select2?true:false, state3: updateUser.select3?true:false, state4: updateUser.select4?true:false}))
        } catch (error) {
            console.error('Error in updateUser:', error);
            return res.send(Result.error("更新失败"));
        }

    },

    //获取所有用户信息
    getAll: async (req, res) => {
        const sql = 'select * from user';
        const data = await db(sql)
        return res.send(Result.success(data))
    },
    //用户登录
    login: async (req, res) => {
        const { username, password } = req.query
        const sql = `select * from user where username = ? and password = ?`
        const results = await db(sql, [username, password])
        if (results.length == 0)
            return res.send(Result.error('用户名或密码错误'))
        const user = { ...results[0], password: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn
        })
        return res.send(Result.success('登录成功', { token: 'Bearer ' + tokenStr, name: user.name, apply: user.apply,state1: user.select1?true:false, state2: user.select2?true:false, state3: user.select3?true:false, state4: user.select4?true:false }))
    },
    //开始判题
    getResult: async (req, res) => {
        try {
            const sql = 'select * from user where apply >= 1';
            const update_sql = 'update user set result1 = ?, result2 = ?,result3 = ?,result4 = ? where id = ?'
            const allUsers = await db(sql);
    
            const promises = allUsers.map(async (user) => {
                console.log('user:' + user.id)
                let { select1, select2, select3, select4 } = user
                let result1 = getResult.getResult1(select1)
                let result2 = getResult.getResult2(select2)
                let result3 = getResult.getResult3(select3)
                let result4 = getResult.getResult4(select4)
    
                if (result1 && result2 && result3 && result4) {
                    await db(update_sql, [result1, result2, result3, result4, user.id]);
                } else {
                    throw new Error(`${user.id}用户数据错误`);
                }
            });
    
            await Promise.all(promises);
    
            res.send(Result.success('成功', '更新成功'));
        } catch (error) {
            console.error(error);
            res.send(Result.error(error.message || '发生错误'));
        }
    },
    
    //导入新生数据
    //  getData: async (req, res) => {
    //      const workbook = XLSX.readFile('D:/Downloads/edge/ccwstudent.xlsx');
    //      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    //      const jsonData = XLSX.utils.sheet_to_json(worksheet);

    //      const sql = 'INSERT INTO user SET ?'

    //      // 插入数据到数据库
    //      for (let i = 0; i < jsonData.length; i++) {
    //          const row = jsonData[i];
    //          const data = await db(sql, row)
    //          console.log(data)
    //          // res.send(Result.success('插入成功'))
    //      }
    //  }
}

module.exports = userService