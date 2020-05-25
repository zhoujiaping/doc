const mysql = require('mysql');
const log = require('./log');

const localEnvOpts = {
	host:'localhost',
	user:'',
	password:'',
	database:'',
	charset		  : 'utf8'
};
const devEnvOpts = {
	connectionLimit:10,
	host:'',
	user:'',
	password:'',
	database:'',
	charset		  : 'utf8'
};
const testEnvOpts = {
	host:'',
	user:'',
	password:'',
	database:'',
	charset		  : 'utf8'
};
var pool  = mysql.createPool(localEnvOpts);
/*  
const conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'jyd'
});
conn.connect();
*/
//��ȡ����  
async function conn(){
	return new Promise((resolve,reject)=>{
		pool.getConnection(function(err, conn) {  
			if (err) {  
				reject(err);  
			}else{
				resolve(conn);
			}			 
		});  
	});
};
async function doInTx(cb){
	return new Promise((resolve,reject)=>{
		dao.conn().then(conn=>{
			conn.beginTransaction(async(err)=>{
				if(err){
					conn.release();
					await cb(err,null);
					return;
				}
				try{
					await cb(null,conn);
					conn.commit((err)=>{
						console.info('commit');
						conn.release(); 
						if(err){
							console.error(err);
							reject(err);
							return;
						}
						resolve();
					});
				}catch(e){
					conn.rollback(err=>{
						console.info('rollback');
						conn.release();
						if(err){
							console.error(err);
							reject(err);
							return;
						}
						reject(e);
					});
				}
			});
		},async err=>{
			await cb(err,null);
		});
	});
};
async function insert({conn,tablename,columns,values}){
	let {sql,params} = genInsertSql({tablename,columns,values});
	//console.info(sql);
	//console.info(JSON.stringify(params,null,2));
	try{
		let rows = await query({conn,sql,params});
		return rows;
	}catch(e){
		if(e.code == 'PARSER_JS_PRECISION_RANGE_EXCEEDED'){
			console.error(JSON.stringify(e));
		}else{
			throw e;
		}
	}
	return;
};
function genInsertSql({tablename,columns,values}){
	const columnnames = columns.join(',');
	const sql = `insert into ${tablename}(${columnnames})values `;
	const params = [];
	const placeholders = [];
	values.forEach((item,index)=>{
		let holder = [];
		for(let i=0;i<columns.length;i++){
			holder.push('?');
			params.push(item[columns[i]]);
		}
		placeholders.push('('+holder.join(',')+')');
	});
	const ret = {
		sql:sql+placeholders.join(',')+';',
		params:params
	};
	//console.info(ret);
	return ret;
}

async function query({conn,sql,params}){
	return new Promise((resolve,reject)=>{
		conn.query(sql,params,(err,res)=>{
			if(err){
				reject(err);
				return;
			}
			//console.info(res);
			//console.info(JSON.stringify(res,null,2));
			resolve(res);
		});
	});
}
function close(){
	pool.end();
}


function dbClient({logger=log.defaultLogger}){
	return {
		doInTx,
		conn,
		pool,
		insert,
		close
	}
}

module.exports = dbClient;