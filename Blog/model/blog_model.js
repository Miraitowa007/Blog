var db=require('./db.js')
var moment=require('moment')
exports.sel_all_blogs=function(callback){
    var sql="select * from t_blogs";
    db.query(sql,[],callback)
}
exports.sel_one_blogs=function(uid,callback){
    
    //var sql="select * from t_blogs,t_users where t_blogs.WRITER=t_users.USER_ID and t_blogs.WRITER=?";
    var sql='select * from t_blogs,t_users,t_blog_catalogs where t_blogs.WRITER=t_users.USER_ID and t_blogs.CATALOG_ID=t_blog_catalogs.CATALOG_ID and t_blogs.WRITER=?'
    db.query(sql,[uid],callback)
}
//通过user_id找出发表博客的人将博客分的类别
exports.sel_cata_blog=function(uid,callback){
    var sql='select * from t_blog_catalogs where USER_ID=?';
    db.query(sql,[uid],callback)
}
exports.insert_blog=function(title,content,catalog,uid,callback){
    var time=moment().format("YY-MM-DD hh-mm-ss")
    console.log(time)
    var sql="insert into t_blogs(TITLE,CONTENT,WRITER,CATALOG_ID,ADD_TIME) values(?,?,?,?,?) "
    db.query(sql,[title,content,uid,catalog,time],callback)
}
exports.sel_blogs_by_bid=function(blogid,callback){
    var sql="select * from t_blogs where BLOG_ID=?"
    db.query(sql,[blogid],callback)
}
exports.updata_blog=function(title,content,cataid,blogid,callback){
    var sql="update t_blogs set TITLE=?,CONTENT=?,CATALOG_ID=? where BLOG_ID=?";
    
    db.query(sql,[title,content,cataid,blogid],callback)
}
exports.update_blog=function(blogid,title,content,cataid,callback){
	var sql="update t_blogs set TITLE=?,CONTENT=?,CATALOG_ID=? where BLOG_ID=?";
	db.query(sql,[title,content,cataid,blogid],callback);
}
exports.del_blog_by_bid=function(bid,callback){
    var sql="delete from t_blogs where BLOG_ID=?";
    db.query(sql,[bid],callback);
}
exports.search_blog=function(title,uid,callback){
    var sql="select * from t_blogs where TITLE like '%"+ title +"%' and WRITER="+ uid;
    db.query(sql,[],callback);
}
exports.viewAllCom=function(bid,callback){
    var sql='select * from t_blogs where BLOG_ID=?'
    db.query(sql,[bid],callback);
}
exports.updata_hits=function(bid,callback){
    var sql='update t_blogs set CLICK_RATE=CLICK_RATE+1 where BLOG_ID=?';
    // SELECT * from t_blogs where BLOG_ID<5 ORDER BY BLOG_ID asc LIMIT 1//查询小于五的第一个
    // SELECT * from t_blogs where BLOG_ID<5 ORDER BY BLOG_ID desc LIMIT 1//查询小于五的最后一个（最大值）
    db.query(sql,[bid],callback)
}//由于在sql中null+1=null所以在设计表时需要把默认值设置为零；javascriptsnull+1=1;
exports.next_blog=function(bid,callback){
    var sql='select * from t_blogs where BLOG_ID<5 ORDER BY BLOG_ID desc LIMIT 1'
    db.query(sql,[bid],callback)
}
exports.previous_blog=function(bid,callback){
    var sql='select * from t_blogs where BLOG_ID>5 ORDER BY BLOG_ID asc LIMIT 1'
    db.query(sql,[bid],callback)
}
