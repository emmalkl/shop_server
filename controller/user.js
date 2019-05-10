const Router =require('koa-router');
let router =new Router();
const mongoose=require('mongoose');

//后端接受post请求
router.post('/registUser',async (ctx)=>{
        //   console.log('请求成功');
        //  ctx.body='请求成功';
      //获取model
      const User=mongoose.model('User')
      //接收post请求封装成user对象
      let newUser=new User(ctx.request.body);//获取响应主体
      //使用mongoose下的save方法保存用户信息
      await newUser.save().then(()=>{
          ctx.body={
              code:200,
              message:'注册成功'
          }
      }).catch(err=>{
        ctx.body={
            code:500,
            message:err
        }
      })
})


router.post('/loginUser',async (ctx)=>{
    // console.log('请求成功');
    //前端获取数据
    let loginUser=ctx.request.body;
    let userName=loginUser.username;
    let password=loginUser.password;
    //连接model
    const User=mongoose.model('User');
    //比对  用户名是否存在  存在的话去对比密码
    await User.findOne({username:userName}).exec().then(async (result)=>{//查询成功返回result对象
        if(result){
            let newUser=new User();
            await newUser.comparePassword(password,result.password)
            .then(ismatch=>{
                if(ismatch){
                    ctx.body={
                        code:200,
                        message:'登陆成功',
                        userInfo:result//将返回的对象保存
                    }
                }else{
                    ctx.body={
                        code:201,
                        message:'登陆失败'
                    }
                }
            })
        }else{
           ctx.body={
               code:201,
               message:'用户不存在'
           }
        }
    })


})


//将router推送出去
module.exports=router;