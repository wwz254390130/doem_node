const path =require('path')
const template=require('art-template')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'szhmqd27';

// 返回列表页面
exports.getStudentList=(req,res)=>{
    // 获取传过来的参数
    // const {username,password}=req.body
   
        // console.log(req.query.username);
        
    const keyword =req.query.keyword || '';
    MongoClient.connect(url,{useNewUrlParser:true}, function(err,client) {    
        // 拿到数据对象db对象
        const db = client.db(dbName);
        // 拿到集合
        const collection = db.collection('studentInfo');

    collection.find({name:{$regex:keyword}}).toArray((err,docs)=>{

        client.close();
        const html =template(path.join(__dirname,"../public/html/list.html"),{students:docs,keyword})
        // console.log(docs);
        
        res.send(html)
      })
         
 });


}