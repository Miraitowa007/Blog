var db=require('./db.js')

//添加数据到数据库
exports.insert=function(email,name,password,callback){
  var sql='insert into t_users(ACCOUNT,PASSWORD,NAME) values(?,?,?)'
  db.query(sql,[email,name,password],callback);
}
//检查是否数据库中有与传入email值相等的email
exports.check=function(email,callback){
  var sql='select * from t_users where ACCOUNT=?';
  db.query(sql,[email],callback);
}
//查询登录邮箱和密码都对应的数据
exports.getname=function(email,pass,callback){
  var sql='select * from t_users where ACCOUNT=? and PASSWORD=? '
  db.query(sql,[email,pass],callback)
}
