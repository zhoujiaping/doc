const db = require('./db');
db.doInTx(async (err,conn)=>{
	if(err){
		console.error(err);
		return;
	}
	let sql = `update t_product set remarks = 'a'`;
	let params = [];
	//console.info('111111111');
	let rows = await db.query({conn,sql,params});
	//console.info('22222222222');
	sql = `update t_product set remarks = 'b'`;
	params = [];
	//throw new Error('error....');
	rows = await db.query({conn,sql,params});
	//console.info('3333333333');
}).then(()=>{
	db.pool.end();
},err=>{
	db.pool.end();
});
