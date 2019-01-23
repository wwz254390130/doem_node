const path =require('path')
const express =require('express')
// 创建路由对象
const studentRouter =express.Router()

// 导入控制器
const studentController =require(path.join(__dirname,'../controllers/studentController.js'))

// 处理请求
studentRouter.get('/list',studentController.getStudentList)

// 获取新增页面的 数据
studentRouter.get('/add',studentController.getAddPage)

// // 新增完成提交数据
studentRouter.post('/add',studentController.AddPage)

// 获取编辑页
studentRouter.get('/edit/:studentId',studentController.getUpdatePage)

// 提交编辑好了的页面
studentRouter.post('/edit/:studentId',studentController.updatePage)

//删除按钮
studentRouter.get('/delete/:studentId',studentController.delPage)

// // 获取编辑页面
// studentRouter.get('/edit/:studentId',studentController.editPage)


module.exports =studentRouter;