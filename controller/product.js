const Koa = require('koa');
const Router = require('koa-router');
let router=new Router();
const mongoose=require('mongoose');
const fs=require('fs');//读取文件

router.get('/insertProductInfo',async (ctx)=>{
    fs.readFile('./data/product.json','utf8',(err,data)=>{
        data=JSON.parse(data);//转化成对象
        console.log(data);
        let count=0;//计数器
        const Product=mongoose.model('Product');
        data.map((value,index)=>{
            let product=new Product(value);
            product.type=Math.floor(Math.random()*8)+1;
            product.save().then(()=>{
                count++;
                console.log('成功：'+count)
            }).catch(err=>{
                console.log('失败：'+err)
            })
        })
    });
    ctx.body='导入数据';
});

router.get('/getProductByType',async (ctx)=>{
    //加载商品对应的模型
    const Product=mongoose.model('Product');
    //     数据库中找   types表里的type=选中的typeId       number型转化,因为传进来是字符串
    await Product.find({type:ctx.query.typeId}).skip(parseInt(ctx.query.start)).limit(parseInt(ctx.query.limit)).exec().then((res)=>{
        ctx.body=res;
    });
});
//商品详情信息的获取
router.get('/getDetail',async (ctx)=>{
    const Product=mongoose.model('Product');
    //post请求时_id：ctx.request.body.id    get请求见下
    
    await Product.findOne({_id:ctx.query.id}).exec().then(async res=>{
        ctx.body=res;
    })
})

module.exports=router;