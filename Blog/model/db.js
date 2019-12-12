var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'blog',
});

exports.query=function(sql,params,callback){
	pool.getConnection(function(err, connection) {
	  if (err) throw err;
	  connection.query(sql,params,function (error, results, fields) {
	    callback(error,results);
	    connection.release();
	  });
	});
}