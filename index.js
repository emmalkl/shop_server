const Koa=require('koa');
const app=new Koa();

//解决跨域问题
const cors=require('koa2-cors');
app.use(cors({
    origin:['http://localhost:8080'],
    credentials:true
}))

//接受前端post请求
const bodyparser=require('koa-bodyparser');
app.use(bodyparser());


//加载路由,找控制器
const Router =require('koa-router');
let user=require('./controller/user.js');
let product=require('./controller/product.js');
let type=require('./controller/type.js');
let cart=require('./controller/cart.js')

let router =new Router();
router.use('/user',user.routes());//user命名
router.use('/product',product.routes());
router.use('/type',type.routes());
router.use('/cart',cart.routes());

app.use(router.routes());
app.use(router.allowedMethods());//只允许特定的请求通过


//来自init.js中的
const {connect,initSchemas}=require('./init.js');

(async()=>{
  await connect();//连接
  initSchemas();//初始化模型
})();


app.use(async (ctx)=>{
   ctx.body='dont know';
})
app.listen(3000,()=>{
    console.log('start shop_server');
})