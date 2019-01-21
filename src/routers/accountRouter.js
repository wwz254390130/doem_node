// 注册和登录处理
const path =require('path')
const express =require('express')
// 创建路由对象
const accountRouter =express.Router()

// 导入控制器模块
const accountContorller= require(path.join(__dirname,"../controllers/accountController.js"))

// 获取注册页面的请求
accountRouter.get('/register',accountContorller.getRegisterPage)

// 注册
accountRouter.post('/register',accountContorller.register)

// 获取登录页面
accountRouter.get('/login',accountContorller.getLoginPage)

// 获取验证码
accountRouter.get('/vcode',accountContorller.getVcodeImage)

// 登录页面
accountRouter.post('/login',accountContorller.login)
// 导出路由对象
module.exports =accountRouter