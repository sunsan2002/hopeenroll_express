/*
 * @Author: sunsan 2390864551@qq.com
 * @Date: 2023-11-28 22:19:57
 * @LastEditors: sunsan 2390864551@qq.com
 * @LastEditTime: 2023-12-24 17:50:36
 * @FilePath: \express-demo\router\userRoute.js
 * @Description: user路由模块
 */
const express = require('express')
const router = express.Router()
const user = require('../service/user')



router.get('/getUser',user.getUserByID)

router.post('/user/add', user.addUser)

router.post('/login', user.login)

router.put('/user/update', user.updateUser)

router.put('/user/getResult', user.getResult)

// router.post('/user/xlsx', user.getData)



//发送get请求
router.get('/', (req, resp) => {
    util.read('pages/index.html').then(res => {
        resp.write(res)
        resp.end()
    })
})

module.exports = router