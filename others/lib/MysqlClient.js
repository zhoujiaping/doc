//npm install -g mysql
const mysql = require('mysql');
const log = require('./log');
const uuid = require('uuid');

const logger = log.defaultLogger;

const clients = new Map();

function MysqlClient(opts){
	this.id = uuid.v4();
	this.options = opts;
	this.pool = mysql.createPool(opts);
	this.sessions = new Map();
	this.isClosed = false;
	clients.set(this.id,this);
}
MysqlClient.closeAll=function(){
	for(let client of clients.keys()){
		if(!client.isClosed){
			client.close();
			clients.delete(client.id);
		}
	}
}
MysqlClient.prototype.getOptions = function(){
	return this.options;
}
MysqlClient.prototype.openSession = async function(opts={id:uuid.v4()}){
	const c = await new Promise((resolve,reject)=>{
		this.pool.getConnection(function(err, conn) {  
			if (err) {  
				reject(err);  
			}else{
				resolve(conn);
			}			 
		});  
	});
	const session = new Session({id:opts.id,conn:c});
	this.sessions.set(session.id,session);
	return session;
}
MysqlClient.prototype.closeSession = function(sessionId){
	if(sessionId instanceof Session){
		sessionId = sessionId.id; 
	}
	this.sessions.get(sessionId).close();
	this.sessions.delete(sessionId);
}
MysqlClient.prototype.close = function(){
	for(let session of this.sessions.keys()){
		if(!session.isClosed){
			session.close();
			this.sessions.delete(client.id);
		}
	}
	this.pool.end();
	clients.delete(this.id);
	this.isClosed = true;
}
function Session({id=uuid.v4(),conn}){
	this.id = uuid.v4();
	this.conn = conn;
	this.isClosed = false;
	//this.transactions = new Map();
}
Session.prototype.getConn = function(){
	return this.conn;
}
Session.prototype.beginTx = async function(opts={id:uuid.v4()}){
	const tx = await new Promise((resolve,reject)=>{
		this.conn.beginTransaction(async(err)=>{
			if(err){
				reject(err);
				return;
			}
			resolve(new Transaction({id:opts.id,conn:this.conn}));
		});
	});
	//this.transactions.set(tx.id,tx);
	return tx;
}
Session.prototype.endTx = function(txId){
	//if(txId instanceof Transaction){
	//	txId = txId.id; 
	//}
	//this.transactions.delete(txId);
}
Session.prototype.doInTx = async function(callback){
	let tx = null;
	try{
		tx = await this.beginTx();
		await callback(null,tx);
		await tx.commit();
	}catch(err){
		callback(err,null);
	}finally{
		if(tx){
			this.endTx(tx);
		}
	}
}
Session.prototype.close = function(){
	//for(let tx of this.transactions.keys()){
	//	this.transactions.delete(tx.id);
	//}
	this.conn.release();
	this.isClosed = true;
}	
Session.prototype.query = async function(sql,params=[]){
	return await new Promise((resolve,reject)=>{
		this.conn.query(sql,params,(err,res)=>{
			if(err){
				reject(err);
				return;
			}
			resolve(res);
		});
	});
}

Session.prototype.insert = async function(tablename,columns,values){
	let {sql,params} = genInsertSql({tablename,columns,values});
	try{
		let rows = await this.query(sql,params);
		return rows;
	}catch(e){
		if(e.code == 'PARSER_JS_PRECISION_RANGE_EXCEEDED'){
			logger.error(JSON.stringify(e));
			return;
		}else{
			throw e;
		}
	}
};

function Transaction({id=uuid.v4(),conn}){
	this.id = id;
	this.conn = conn;
}
Transaction.prototype.rollback = async function(tablename,columns,values){
	await new Promise((resolve,reject)=>{
		this.conn.rollback(err=>{
			if(err){
				reject(err);
				return;
			}
			resolve();
		});
	});
}
Transaction.prototype.commit = async function(tablename,columns,values){
	await new Promise((resolve,reject)=>{
		this.conn.commit((err)=>{
			if(err){
				reject(err);
				return;
			}
			resolve();
		});
	});
}
function genInsertSql({tablename,columns,values}){
	const columnnames = columns.join(',');
	const sql = `insert into ${tablename}(${columnnames})values `;
	const params = [];
	const placeholders = [];
	if(values[0] instanceof Array){
		values.forEach((item,index)=>{
			let holder = [];
			columns.forEach((column,j)=>{
				holder.push('?');
				params.push(item[j]);
			});
			placeholders.push('('+holder.join(',')+')');
		});
	}else{
		values.forEach((item,index)=>{
			let holder = [];
			columns.forEach(column=>{
				holder.push('?');
				params.push(item[column]);
			});
			placeholders.push('('+holder.join(',')+')');
		});
	}
	return {
		sql:sql+placeholders.join(',')+';',
		params:params
	};
}
//please handle exception by youself
async function demo(){
	const options = {
		host:'localhost',
		user:'root',
		password:'123456',
		database:'test',
		charset		  : 'utf8'
	};
	//回调风格
	const client = new MysqlClient(options);
	const session = await client.openSession();
	const res = await session.doInTx(async (err,tx)=>{
		const rows1 = await session.query(`select * from user where name=?;`,['sirenia']);
		logger.info(rows1.length);
		const rows2 = await session.query(`insert into user(name,nick)values(?,?),(?,?)`,['sirenia','海妖','tw','诱惑本质']);
		logger.info(rows2.length);
		await session.insert('user',['name','nick'],[['tw','诱惑本质'],['sirenia','海妖']]);
		await session.insert('user',['name','nick'],[{
			name:'tw',
			nick:'诱惑本质'
		},{
			name:'sirenia',
			nick:'海妖'
		}]);
		return 'success';
	});
	client.closeSession(session);
	//同步代码风格
	const client2 = new MysqlClient(options);
	const session2 = await client2.openSession();
	const tx = await session2.beginTx();
	try{
		const row1 = await session.query(`select * from user where name=?;`,['sirenia']);
		logger.info(row1.length);
		await tx.commit();
	}catch(err){
		await tx.rollback();
	}finally{
		await session2.endTx(tx);
		client2.closeSession(session2);
	}
	client.close();
}
//demo().catch(err=>logger.error(err));
module.exports = MysqlClient;