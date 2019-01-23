// 导入mongodb
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';

// 数据库名
const dbName = 'szhmqd27';
// 添加数据的接口

const insertOnes = (collectionName,data,callback) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, client) => {
        // 拿到db
        const db = client.db(dbName);
        // 拿到集合
        const collection = db.collection(collectionName);
        // 查询一个
        collection.insertOne(data,(err,doc) => {
            // 关闭数据库
            client.close()
            // 执行回调函数
            callback(err,doc)
        })

    });
}
// 查询多个数据的接口
const findMany=(collectionName,data,callback)=>{
    MongoClient.connect(url,{useNewUrlParser:true}, function(err,client) {    
        // 拿到数据对象db对象
        const db = client.db(dbName);
        // 拿到集合
        const collection = db.collection(collectionName);

    collection.find({name:{$regex:data}}).toArray((err,docs)=>{
        // 关闭数据库
        client.close();
        // 执行回调函数
        callback(err,docs)
      })
    });
}

// 查询数据的接口
const findOnes = (collectionName, data, callback) => {
    
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, client) => {
        // 拿到db
        const db = client.db(dbName);
        // 拿到集合
        const collection = db.collection(collectionName);
        collection.findOne(data, (err, doc) => {
            //   关闭数据库
            client.close()
            // 执行回调函数
            callback(err, doc)
        })

    })
}
/**修改数据
 * 
 */
const updateOnes =(collectionName,condition,data,callback)=>{
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, client) =>{
        // 拿到db
        const db =client.db(dbName);
        // 拿到集合
        const collection= db.collection(collectionName)
        collection.updateOne(condition,{$set:data},(err,doc)=>{
            // 关闭数据库
            client.close();
            // 执行回调函数,返回执行函数
            callback(err,doc)
        })
    })
}

const delOne =(collectionName,data,callback)=>{
    MongoClient.connect(url,{useNewUrlParser:true},(err,client)=>{
        //拿到db
        const db =client.db(dbName)
        // 拿到集合
        const collection =db.collection(collectionName)
        collection.deleteOne(data,(err,result)=>{
            //关闭数据库
            client.close()
            // 执行回调把结果传递给控制器
            callback(err,result)
        })
    })
}

module.exports = {
    insertOnes,
    findOnes,
    findMany,
    ObjectId,
    updateOnes,
    delOne
}