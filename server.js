var http=require('http'),
	fs=require('fs'),
	url=require('url');

FILE='e:/1124';

http.createServer(function(req,res){
	console.log('headers',req.headers);
	console.log('connection',req.connection.remoteAddress);
	res.writeHead(200,{'Content-Type':'text/html'});
	var urlTxt=FILE+url.parse(req.url).pathname;
	try{
		var data=fs.readFileSync(urlTxt,'utf-8');
		res.write(data);
	}catch(err){
		console.log('error:'+err);
	}
	res.end('response end !');
}).listen(8080);
console.log('server is running at 8080');
