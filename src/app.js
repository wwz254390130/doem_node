// 导包
const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')


// 创建app
const  app =express();
 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Use the session middleware
app.use(session({ secret: 'keyboard cat',resave:false,saveUninitialized:false, cookie: { maxAge: 6000000 }}))

// 设置静态资源根目录
app.use(express.static(path.join(__dirname,"public")))


// 拦截到所以的请求
app.all('/*',(req,res,next)=>{
    if(req.url.includes('account')){
        // 执行下一个中间件
        next()
    }else{
        if(req.session.loginName){
            next()
        }else{
            res.send(`<script>alert('你还没有登录请先登录!');location.href='/account/login'</script>`)
        }
    }
})




// 导入路由对象,路由中间写在最后面
const accountRouter =require(path.join(__dirname,'routers/accountRouter.js'))

const studentRouters =require(path.join(__dirname,'routers/studentRouter.js'))

app.use('/account',accountRouter)
app.use('/student',studentRouters)


// 启动
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err);       
    }
    console.log('start ok');
    
})

