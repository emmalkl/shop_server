//模型=数据库的表/mongodb的集合
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');

const userSchema=new Schema({
    userId:Schema.Types.ObjectId,//唯一标识
    username:{unique:true,type:String},//不能重复，字符串类型,       ！！！与前端的data里的username一样
    password:String,
    createDate:{type:Date,default:Date.now()}//date型，默认值当前系统时间
});

//加载模块前给密码加密
userSchema.pre('save',function(next){//每次调用save之前执行  注意箭头函数中没有this然后就要找function
    //随机生成salt 10指的是迭代次数
    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next (err);
        bcrypt.hash(this.password, salt, (err, hash)=>{           
            if(err) return next(err);
            this.password=hash;
            next();
        });
    });
})

//数据库 写对比密码的方法 模型下对应方法??
userSchema.methods={
    comparePassword:(_password,password)=>{
        // console.log(_password,password)
       return new Promise((resolve,reject)=>{
           //            接收的密码  加密的密码
           bcrypt.compare(_password,password,(err,ismatch)=>{
            if(!err) resolve(ismatch) //成功返回ismatch ==true
            else reject(err)
           })
       })
    }
}

//发布模型
mongoose.model('User',userSchema)//???


