const path =require('path')
const express =require('express')
// 创建路由对象
const studentRouter =express.Router()

// 导入控制器
const studentController =require(path.join(__dirname,'../controllers/studentController.js'))

// 处理请求
studentRouter.get('/list',studentController.getStudentList)

module.exports =studentRouter;