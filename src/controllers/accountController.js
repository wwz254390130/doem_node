const path = require('path')

const captchapng = require('captchapng')
const datatool = require(path.join(__dirname, "../tool/datatool.js"))


// 导出的一个方法,改方法获取注册页面
exports.getRegisterPage = (req, res) => {
    // 内部就是对 fs.readFile的封装
    res.sendFile(path.join(__dirname, "../public/html/register.html"));

}



// 导出的注册方法
exports.register = (req, res) => {
    const result = {
        status: 0,
        message: "注册成功"
    }
    // 1.拿到浏览器传过来的数据
    const {
        username
    } = req.body;

    // 2.先判断数据库中用户名,是否存在
    datatool.findOnes("accountInfo", req.body, (err, doc) => {
        if (doc) {
            result.status = 1;
            result.message = "用户名已经存在"
            res.json(result)
        } else {

            datatool.insertOnes("accountInfo", req.body, (err, result2) => {
                if (!result2) {
                    result.status = 2;
                    result.message = "注册失败"
                }
                res.json(result)
            })
        }
    })


}


//   导出获取登录页的方法
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/login.html"))
}

// 导出验证码
exports.getVcodeImage = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000);
    // 把vocde 保存到session 对象中去 ,方便将来登录
    req.session.vcode = vcode
    var p = new captchapng(80, 30, vcode);
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = Buffer.from(img, "base64");
    res.writeHead(200, {
        "Content-Type": "image/png"
    });
    res.end(imgbase64)

}

// 导出登录的方法
exports.login = (req, res) => {
    const result1 = {
        status: 0,
        message: '登录成功'
    }
    // 拿到账号和密码
    const {username,
        password,
        vcode
    } = req.body

    console.log(vcode);
    if (vcode != req.session.vcode) {
        result1.status = 1;
        result1.message = "验证码错误"
        res.json(result1)
      return
    }
 
    datatool.findOnes('accountInfo', {username,password}, (err, docs) => {
        if (!docs) {
            result1.status = 2;
            result1.message = "账号或者密码错误!"
        } else{
        req.session.loginName =username;
        }
        res.json(result1)
    })

}
