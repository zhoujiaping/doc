var http = require('http');
http.createServer(function handler(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
    <html doctype="html">
    		<body><p><a href="tel://18820077637">call phone</a></p></body>
    </html>
    `);
}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
