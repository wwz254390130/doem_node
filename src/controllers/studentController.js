const path =require('path')
const template=require('art-template')
const datatool =require(path.join(__dirname,"../tool/datatool.js"))

 

// 返回列表页面
exports.getStudentList=(req,res)=>{
    // 获取传过来的参数
        
    const keyword =req.query.keyword || '';
    datatool.findMany('studentInfo',keyword,(err,docs)=>{
        const html =template(path.join(__dirname,"../public/html/list.html"),{students:docs,keyword,loginName:req.session.loginName})
        // console.log(docs);    
        res.send(html)
    })
  

}
// 获取新增页面
exports.getAddPage=(req,res)=>{
        const html =template(path.join(__dirname,'../public/html/add.html'),{loginName:req.session.loginName})    
        res.send(html)

}
// // 提交新增页面
exports.AddPage=(req,res)=>{
    datatool.insertOnes("studentInfo",req.body,(err,doc)=>{   
        if(!doc){
           res.send(`<script>alert('新增失败!')</script>`) 
        }else{
            res.send( `<script>location.href='/student/list'</script>`)
        }
        
    })
}

// 获取编辑页面
exports.getUpdatePage=(req,res)=>{
// 获取_id传过去的id  
    const _id =datatool.ObjectId(req.params.studentId)
    datatool.findOnes("studentInfo",{_id},(err,doc)=>{
        console.log(_id);
        // 把session的用户名取出来赋值给对象
        doc.loginName=req.session.loginName
        // 调用模板渲染页面
        const html = template(path.join(__dirname,"../public/html/edit.html"),doc)
        // console.log(doc);       
        res.send(html)
    })
  
}

exports.updatePage=(req,res)=>{
    // 获取传过来的id
    const _id=datatool.ObjectId(req.params.studentId)
    datatool.updateOnes("studentInfo",{_id},req.body,(err,doc)=>{
    //    console.log(doc);
       if(doc.matchedCount !==1){
           res.send("<script>alert('修改失败!')</script>")
       }else{
           res.send("<script>location='/student/list'</script>")
       }
       
    })
}

// 删除
exports.delPage = (req,res)=>{
    // console.log('1111');
    // console.log(req.params);
    
    const _id =datatool.ObjectId(req.params.studentId)
    console.log(_id);
    
    datatool.delOne("studentInfo",{_id},(err,doc)=>{
        console.log(doc);
        
        if(doc.deletedCount !==1){
            res.send("<script>alert('修改失败!')</script>")
        }else{
            res.send("<script>location='/student/list'</script>")
        }
        
    })

}