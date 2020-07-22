const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

const log = require('./log');
const logger = log.defaultLogger;

const reqHandler = {};

reqHandler['/test'] = (req,res)=>{
	const reqUrl = url.parse(req.url);
	const params = querystring.parse(reqUrl.query);
	let data = 'test';
	res.writeHead(200, 'OK', {
	  'Set-Cookie':'HOW=HOW',
	  'Content-Type': 'text/html; charset=utf-8',
	  'Content-Length': Buffer.byteLength(data)
	});
	res.write(data);
	res.end();
};

reqHandler['/test/1'] = (req,res)=>{
	const reqUrl = url.parse(req.url);
	const params = querystring.parse(reqUrl.query);
	let data = 'test';
	res.writeHead(302, 'Found', {
	  'Content-Length': 0,
		'server': 'nginx',
		'date': 'Wed, 06 Mar 2019 10:20:48 GMT',
		'content-length': 0,
		'connection': 'close',
		'location': 'https://abc.com/index.html'
	});
	//res.write(data);
	res.end();
};

reqHandler['/pdfjs/web/viewer.html'] = (req,res)=>{
	const reqUrl = url.parse(req.url);
	const params = querystring.parse(reqUrl.query);
	fs.readFile('./merged.pdf','binary',(err,data)=>{
		if(err){
			logger.error(err);
			return;
		}else{
			res.writeHead(200, 'OK', {
			  'Content-Type': 'application/pdf',
			  'Content-Length': Buffer.byteLength(data)
			});
			res.write(data,'binary');
			res.end();
		}
	});
};





module.exports = reqHandler;