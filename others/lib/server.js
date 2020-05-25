const http = require('http');
const url = require('url');
const querystring = require('querystring');
const reqHandler = require('./req-handler');

const log = require('./log');
const logger = log.defaultLogger;


const server = http.createServer();
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.on('request',(req,res)=>{
	logger.info(req.url);
	const reqUrl = url.parse(req.url);
	const params = querystring.parse(reqUrl.query);
	const handler = reqHandler[reqUrl.pathname];
	if(handler==null){
		let data = '404';
		res.writeHead(404, 'file not found', {
		  'Content-Type': 'text/plain; charset=utf-8',
		  'Content-Length': Buffer.byteLength(data)
		});
		res.write(data);
		res.end();
	}else{
		try{
			handler(req,res);
		}catch(e){
			logger.error(e);
			res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end('500');
		}
	}
	
	/*
	let data = JSON.stringify({test:'hello world'});	
	res.writeHead(200, 'OK', {
	  'Content-Type': 'text/html; charset=utf-8',
	  'Content-Length': Buffer.byteLength(data)
	});
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write(data);
    res.end();*/
});
let port = 8090;
server.listen(port);
logger.info(`server started at port ${port}`);

