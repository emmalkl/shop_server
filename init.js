const mongoose=require('mongoose');
const db='mongodb://localhost/shop1';

//引入schema
const glob=require('glob');
const path=require('path');
exports.initSchemas=()=>{
    //获取绝对地址，将model下所有js文件全部引入
    glob.sync(path.resolve(__dirname,'./model','*.js')).forEach(require);
    
}


exports.connect=()=>{
   //连接数据库
   mongoose.connect(db,{useNewUrlParser:true});
   //监听数据库连接
   mongoose.connection.on('disconnected',()=>{
       mongoose.connect(db);
   });
   //数据库出现错误
   mongoose.connection.on('error',err=>{
       console.log(err);
    mongoose.connect(db);
   });
   //连接的时候
   mongoose.connection.once('open',()=>{
    console.log('mongodb connected success');
   });
}