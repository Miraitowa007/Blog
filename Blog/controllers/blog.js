var blog_model=require('../model/blog_model')
//可以利用session取到来自于不同控制器下的值
exports.index=function(req,res,next){
    //console.log(req.session)
    var uid=req.session.id;
    blog_model.sel_one_blogs(uid,function(err,data){
        if(data.length>0){
            res.render("index_logined",{
                'sess':req.session,//由于页面调用了session的name和id所以需要将其喷入页面；
                'blogs':data
            })
        }
    })
}
exports.uindex=function(req,res,next){
    blog_model.sel_all_blogs(function(err,data){
        if(data.length>0){
            res.render("index",{
                'blogs':data,
            })
        }
    })
}
exports.add_blogs=function(req,res,next){
    var uid=req.session.id;
    blog_model.sel_cata_blog(uid,function(err,data){
            if(data.length>0){
                res.render('newBlog',{
                    'sess':req.session,
                    'cata':data
                })
            }
        })
}
exports.do_add_blogs=function(req,res,next){
    var title=req.body.title;
    var content=req.body.content;
    var catalog=req.body.catalog;
    var uid=req.session.id;
    blog_model.insert_blog(title,content,catalog,uid,function(err,data){
        if(data.affectedRows==1){
            res.redirect('/index')//增加通常是利用affected检验是否增加成功，搜索是利用length属性判断是否搜索成功
        }
    })
}
exports.updata_blog=function(req,res,next){
    var bid=req.params.bid;
    blog_model.sel_blogs_by_bid(bid,function(err,data){
        if(data.length>0){
           var con=data[0];//根据BLOG_ID获取到的该博客的全部信息
           var uid=req.session.id;
           blog_model.sel_cata_blog(uid,function(err,data){
               res.render('updatablog',{
                   "sess":req.session,
                   "cata":data,//根据UID获取的该作者书写的博客分类
                    "con":con//使页面获取到了BLOG_ID
               })
           })
        }
    })
}
exports.do_updata_blog=function(req,res,next){
    var blogid=req.body.hid;//为什么不能够通过req.params.bid来获取
    var title=req.body.title;
    var content=req.body.content;
    var cataid=req.body.catalog;
    blog_model.updata_blog(title,content,cataid,blogid,function(err,data){
        if(data.affectedRows==1){
            res.redirect('/index')//增加通常是利用affected检验是否增加成功，搜索是利用length属性判断是否搜索成功
        }
    })
}
exports.delete_blog=function(req,res,next){
    var bid=req.params.bid;
    blog_model.del_blog_by_bid(bid,function(err,data){
        
            res.redirect('/index')
        
    })
}
exports.search_blog=function(req,res,next){
    var title=req.body.search;
    var uid=req.session.id;
    blog_model.search_blog(title,uid,function(err,data){
        if(data.length>0){
            res.render("index_search_blog",{
                "sess":req.session,
                "blogs":data//由于循环展示了该作者所写文章，方便起见，不需要更改blogs
            })
        }
    })
}
//展示博客添加分类
exports.catalog_blog=function(req,res,next){
    var uid=req.session.id;
    blog_model.sel_cata_blog(uid,function(err,data){
        if(data.length>0){
            res.render('blogCatalogs',{
                'sess':req.session,
                'catas':data
            }) 

        }
    })
    
}
//阅读全文
exports.viewPost_logined=function(req,res,next){
    var bid=req.params.bid;
    //更改观看数目
    blog_model.updata_hits(bid,function(err,data){
        if(data.affectedRows==1){
            blog_model.viewAllCom(bid,function(err,data){
                if(data.length>0){
                    var thisdata=data[0];
                    blog_model.next_blog(bid,function(err,data){
                        if(data.length>0){
                            var ndata=data[0]
                            blog_model.previous_blog(bid,function(err,data){
                            if(data.length>0){
                                res.render('viewPost_logined',{
                                    'sess':req.session,
                                    'data':thisdata,
                                    'ndata':ndata,
                                    'pdata':data[0]
                                })
                                console.log(data)
                            }
                        })
                        }   
                    })
                }
            })
        }
    })
    //res.render('viewPost_comment');
}