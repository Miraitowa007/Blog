var user_model=require("../model/user_model.js")
var md5=require('md5')
/*练习页面
var async=require('async')
exports.login=function(req,res,next){
    //console.log(123)
    res.render('reg');//渲染登录页面
}
exports.do_login=function(req,res,next){
    var name=req.body.username;//只适用于post传输
    var password=req.body.password;
    console.log(name);
    console.log(password);
//解决地狱回调问题，将回调函数嵌套转换为两个串联函数
    async.waterfall([
        function(callback){
            user_model.check(name,function(err,data){
                callback(null,data)
            })   
        },
        function(data,callback){
            if(data.length>0){
                res.send("用户名重名")
            }else{
                user_model.reg(name,password,function(err,data){
                    if(data.affectedRows>0){
                        res.redirect('/login');
                    }    
                })
            }
        }
    ])

    user_model.check(name,function(err,data){
        if(data.length>0){
            res.send("用户名重名")
        }else{
            user_model.reg(name,password,function(err,data){
                if(data.affectedRows>0){
                    res.redirect('/login');
                }    
            })
        }
    })
}
exports.donging_login=function(req,res,next){
    res.render('login')
}
exports.parse=function(req,res,next){
    console.log(req.query.yy)
}
exports.check=function(req,res,next){
    var val=req.body.value;
    if(val=="aa"){
        res.json({
            errmsg:'正常',
            errno:101
        })
    }else{
        res.json({
            errmsg:'错误',
            errno:1
        })
    }
}
*/
//首页，渲染登录页面
exports.reg=function(req,res,next){
    res.render('reg')
}
//登录页面，进行登录操作，同时将注册内容加载到数据库
exports.do_reg=function(req,res,next){
    var email=req.body.email;
    var name=req.body.name;
    var pwd=req.body.pwd;
    //var mpwd=md5(pwd)
    user_model.check(email,function(err,data){
        if(data.length>0){
            res.redirect('reg')
        }else{
            user_model.insert(email,name,pwd,function(err,data){
                if(data.affectedRows==1){
                    res.redirect('/login')
                }
            })
        }
    })
}
//检查是否重名
exports.checkname=function(req,res,next){
    var email=req.body.email;
    user_model.check(email,function(err,data){
        if(data.length>0){
            res.json({
                'errno':101
            })
        }else{
            res.json({
                'errno':1
            })
        }
    })
}


//登录页面
exports.login=function(req,res,next){
    res.render('login')
}
exports.do_login=function(req,res,next){
    var email=req.body.email;
    var pass=req.body.pwd;
    //var mpass=md5(pass)
    user_model.getname(email,pass,function(err,data){
        if(data.length>0){
            //console.log(data);
            //设置cookiesession---第三方包可以解决跨域问题
            req.session.id=data[0].USER_ID;
            req.session.name=data[0].NAME;
            //接下来利用user_id和name来读取数据的blog主页信息t_blogs中的内容
            res.redirect('/index')
        }
    })
}
exports.unlogin=function(req,res,next){
    req.session=null;//清除session
    res.redirect("/uindex")
}

//awesome node.js对于npm的功能做了分类