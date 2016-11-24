/**
 * 首先全局安装
 * npm安装http-proxy（npm install-g http-proxy）
 *
 * 全局安装过后运行找不到包，可以尝试本地安装
 */

var http=require('http'),
	httpProxy=require('http-proxy');

// 创建一个proxy server对象
var proxy=httpProxy.createProxyServer({});

// 捕获异常 
proxy.on('error',function(err,req,res){
	res.writeHead(500,{'Content-Type':'text/html'});
	res.end('If you can see that , some error happened..');
});

// 新建一个node服务 端口80 
var server=http.createServer(function(req,res){
	var host=req.headers.host,
		ip=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log('client ip:'+ip+', host:'+host);

	switch(host) {
		case '127.0.0.1':
			proxy.web(req,res,{
				target:'http://127.0.0.1:8080'
			})
			break;
		default :
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end('welcome!');			
	}
});
server.listen(80);
console.log('listen on port 80');