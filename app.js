/*
 * @Author: sunsan 2390864551@qq.com
 * @Date: 2023-11-26 16:35:16
 * @LastEditors: sunsan 2390864551@qq.com
 * @LastEditTime: 2023-12-31 17:05:52
 * @FilePath: \express-demo\app.js
 * @Description: app.js
 */
const express = require('express');
const { db } = require('./utils/db')
const util = require('./utils/util')
const router = require('./router/userRoute')
const config = require('./config')
const expressJWT = require('express-jwt')
const cors = require('cors')
// const NodeFirewall = require('node-firewall');

const app = express();


app.use(cors())


// 关闭指定端口的防火墙
 const port = 8080; // 要关闭的端口号


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

 app.use(
     expressJWT({ secret: config.jwtSecretKey }).unless({ path: ['/login', '/user/getResult'] })
 )
 // 自定义错误处理中间件
 app.use((err, req, res, next) => {
     if (err.name === 'UnauthorizedError') {
        const token = req.headers.authorization.split(" ")[1];
        console.log("Received Token:", token);
         console.log('UnauthorizedError:', err.message);
         return res.send({ message: '身份认证失败' });
     }
     next();
 });

app.use(router)
app.use('/static', express.static(__dirname + '/static'))



//监听服务器端口
app.listen(port, () => {
    console.log('server is running')
}) 