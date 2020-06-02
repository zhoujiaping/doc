//npm install -g mysql
const mysql = require('mysql');
require('./mysqlPolify');
const log = require('./log');
const uuid = require('uuid');

const logger = log.defaultLogger;

//客户端集合
const clients = new Map();
/**
mysql客户端，一个客户端可以打开多个会话，一个会话占用一个连接，一个会话可以执行多个事务。
*/
function MysqlClient(opts){
    //客户端id
	this.id = uuid.v4();
	//
	this.options = opts;
	//连接池
	this.pool = mysql.createPool(opts);
	//会话集合
	this.sessions = new Map();
	//客户端是否已关闭
	this.isClosed = false;
	clients.set(this.id,this);
}
/**
关闭所有客户端
*/
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
/**打开一个会话*/
MysqlClient.prototype.openSession = async function(opts={id:uuid.v4()}){
	const conn = await this.pool.getConnection();
    //var c2 = Object.create(Object.getPrototypeOf(c), Object.getOwnPropertyDescriptors(c));
	const session = new Session({id:opts.id,conn:conn});
    //代理连接，判断会话是否被关闭，被关闭的会话将不能再做增删查改
	const connProxy = new Proxy(conn, {
        get: (target, key)=> {
            checkSession(session);
            return Reflect.get(target, key);
        },
        set: (target, key, value)=> {
          return Reflect.set(target, key, value);
        }
    });
    session.conn = connProxy;
	this.sessions.set(session.id,session);
	return session;
}
/**关闭会话，并从会话集合中移除该会话*/
MysqlClient.prototype.closeSession = function(sessionId){
	if(sessionId instanceof Session){
		sessionId = sessionId.id; 
	}
	this.sessions.get(sessionId).close();
	this.sessions.delete(sessionId);
}
/**关闭客户端，关闭它的所有会话*/
MysqlClient.prototype.close = function(){
	for(let session of this.sessions.keys()){
		if(!session.isClosed){
			session.close();
			this.sessions.delete(session.id);
		}
	}
	this.pool.end();
	clients.delete(this.id);
	this.isClosed = true;
}
/**
检查会话是否已经关闭，如果已经关闭，则抛异常
*/
function checkSession(session){
    if(session.isClosed){
        throw new Error(`session is closed,sessionId: ${session.id}`);
    }
}
function Session({id=uuid.v4(),conn}){
    //会话id
	this.id = uuid.v4();
	//占用一个连接
	this.conn = conn;
	//会话是否已经关闭
	this.isClosed = false;
	//this.transactions = new Map();
}
/**开启一个事务*/
Session.prototype.beginTx = async function(opts={id:uuid.v4()}){
    await this.conn.beginTransaction();
    try{
    	//logger.info(`begintx...`)
    	return new Transaction({id:opts.id,conn:this.conn});
    }catch(err){
        await this.conn.rollback();
        throw err;
    }
}
/**在事务中执行回调函数*/
Session.prototype.doInTx = async function(callback){
    let tx = null;
    try{
        tx = await this.beginTx();
    }catch(err){
        callback(err,null);
        return;
    }

	try{
		await callback(null,tx);
		await tx.commit();
	}catch(err){
       	await tx.rollback();
       	throw err;
	}
}
/**关闭会话，和client的关闭会话不一样，client的关闭会话会将该会话从会话集合中移除，但是这个方法只是释放连接。
所以用户不应该直接使用此方法。
*/
Session.prototype.close = async function(){
	await this.conn.release();
	this.isClosed = true;
}
/**执行sql语句*/
Session.prototype.query = async function(sql,params=[]){
	return await this.conn.query(sql,params);
}
/**执行insert，虽然该方法可以通过query方法实现，但是该方法方便批量插入*/
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
/**事务*/
function Transaction({id=uuid.v4(),conn}){
	this.id = id;
	//该事务基于哪个连接
	this.conn = conn;
}
/**回滚*/
Transaction.prototype.rollback = async function(){
	await this.conn.rollback();
}
/**提交*/
Transaction.prototype.commit = async function(){
	await this.conn.commit();
}
/**生成批量插入的sql和参数*/
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
async function test(){
	const options = {
		host:'localhost',
		user:'root',
		password:'',
		database:'test',
		charset		  : 'utf8'
	};
	//回调风格
	const client = new MysqlClient(options);
	const session = await client.openSession();
	logger.info(`session.id=${session.id}`);
	try{
	    await session.doInTx(async (err,tx)=>{
            if(err){
                logger.error(err);
                return;
            }
            await session.query(`create table if not exists user(id bigint primary key auto_increment,name varchar(50),nick varchar(50));`);
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
        });
	}finally{
	    try{
	        await client.closeSession(session);
	    }finally{
	        client.close();
	    }
	}

	//同步代码风格
	const client2 = new MysqlClient(options);
	const session2 = await client2.openSession();
	let tx = null;
	try{
	    tx = await session2.beginTx();
		const row1 = await session2.query(`select * from user where name=?;`,['sirenia']);
		logger.info(row1.length);
		await tx.commit();
	}catch(err){
	    if(tx){
	    	await tx.rollback();
	    }
	    throw err;
	}finally{
		try{
            await client2.closeSession(session2);
        }finally{
            client2.close();
        }
	}
}
test().catch(err=>logger.error(err));
module.exports = MysqlClient;