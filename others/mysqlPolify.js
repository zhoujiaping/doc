const mysql = require('mysql');
const log = require('./log');
const {polifySync,polifyAsync} = require('./awaitPolify');

polifySync(mysql,'createPool',poolPoly);
function poolPoly(pool){
	polifyAsync(pool,'getConnection',getConnectionPoly);
}
function getConnectionPoly(conn){
	polifyAsync(conn,'beginTransaction');
	polifyAsync(conn,'commit');
	polifyAsync(conn,'rollback');
	polifyAsync(conn,'query');
}

/**
conn.release();
conn.rollback(cb);
conn.commit(cb);
pool.end();
*/

//如果报错：SyntaxError: Unexpected identifier，并且错误行有关键字await，那么该错误就是在非async函数中使用了await。
async function test(){
	const pool = mysql.createPool({
		connectionLimit:10,
		host:'localhost',
		user:'root',
		password:'',
		database:'test',
		charset		  : 'utf8'
	});
	const conn = await pool.getConnection();
	const res = await conn.query(`select * from user where name=?`,['tw']);
	log.defaultLogger.info(res.length);
	
	pool.getConnection(async (err,conn)=>{
		if(err){
			logger.error(err);
			return;
		}
		const res = await conn.query(`select * from user where name=?`,['tw']);
		log.defaultLogger.info(res.length);
	});
}
//test();
module.exports = {};