var express = require('express');
var router = express.Router();
var User=require('../controllers/users.js')
var Blog=require('../controllers/blog.js')

/* GET home page. */
//利用get 获取路由，执行回调函数
/*router.get('/', function(req, res, next) {
  res.render('uindex', { title: 'Express','name':'mm' });
});*/
//res.render()属于express内的方法 res.render(view [, locals] [, callback])
/*router.get('/parse',function(req,res,next){
  res.render('dns',{
    'name':'dd',
    'age':1
  });
})*/
/*router.get('/reg',User.login)
router.post('/reg',User.do_login)
router.get('/login',User.donging_login)
router.get('/parse',User.parse)//为什么在有两个get 请求，且第一个有返回值时获取不到传递的参数
/*router.post('/check',User.check)*/

//注册功能
router.get('/',User.reg)//当进入网站时，自动调用出方法reg（即渲染注册页面）
router.get('/reg',User.reg)//进入注册页路由时，调用方法reg（即渲染出注册页面）
router.post('/reg',User.do_reg)//在enter后发出请求，获取注册页面路由下获取输入框中的内容
                               //并接收获取内容的返回值，执行方法do_reg

//检查注册邮件名字是否重名
router.post('/checkname',User.checkname)//为什么访问的时候拿到的同样是reg路径下的数据
//登录功能
router.get('/login',User.login)//注册成功后，进入/login路由控制，自动调用出方法login（即渲染登录页面）
router.post('/login',User.do_login)//在enter后发出请求，获取登录页面路由下获取输入框中的内容
                                   //并接收获取内容的返回值，执行方法do_login
router.get('/unlogin',User.unlogin)//清除session值，并且作为中间值转换到uindex路由
                                  //通过超链接跳转到uindex页面
                                  //同时调用uindex方法（即渲染游客身份登录index页面）
                                  
//主页功能
router.get('/index',Blog.index)//登录成功后，进入/index路由下，自动调用出方法login（即渲染某游客登录index_logined主页）
router.get('/uindex',Blog.uindex)//通过超链接跳转到uindex页面，同时调用uindex方法（即渲染游客身份登录index页面）

//发表博客功能及增删检查
router.get('/add_blogs',Blog.add_blogs)
router.post('/add_blogs',Blog.do_add_blogs)
router.get('/updata_blog/:bid',Blog.updata_blog)
router.post('/updata_blog',Blog.do_updata_blog)
router.get('/delete/:bid',Blog.delete_blog)
//搜索栏
router.post('/search',Blog.search_blog)
//博客分类管理
router.get('/blogcatalogs',Blog.catalog_blog)
//阅读全文
router.get('/viewPost_logined/:bid',Blog.viewPost_logined)
module.exports = router;
