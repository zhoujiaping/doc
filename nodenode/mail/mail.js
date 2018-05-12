const nodemailer = require('nodemailer');
const user = '421211679@qq.com',
      pass = 'nzmfznbrlbbucacb';
const smtpTransport = nodemailer.createTransport({
	service:'QQ',
	auth:{
		user: user,
		pass: pass
	}
});
smtpTransport.sendMail({
	from: `421211679@qq.com`,
	to: '<421211679@qq.com>',
	subject: 'Node.JS邮件',
	html:'这是一封测试邮件'
},(err,res)=>{
	console.log(err,res);
});
