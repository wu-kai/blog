var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var demoRouter = require('./api/demo.router');
var blogRouter = require('./api/blog.router');
var db = require('./common/db');
var ueditor = require('ueditor');         //重点加载

var app = express();

var BODY_PARSER_MAX_BYTES = 1024 * 1024 * 10; // 10MB allowed to receive body content

db.connect();

app.use(bodyParser.json({limit: BODY_PARSER_MAX_BYTES}));
app.use(bodyParser.urlencoded({extended: true, limit: BODY_PARSER_MAX_BYTES}));

var isDev = process.env.NODE_ENV === 'dev';

//富文本编辑器图片上传配置
app.use("/libStatic/ueditor-utf8-php/ue", ueditor(path.join(__dirname, '../images'), function (req, res, next) {

	var date = new Date();
	var y= date.getFullYear();
	var m= date.getMonth();
	var d= date.getDay();
	// ueditor 客户发起上传图片请求
	if (req.query.action === 'uploadimage') {
		var foo = req.ueditor;
		var imgname = req.ueditor.filename;
		var img_url = '/ueditor/'+y+'/'+m+'/'+d+'/';
		res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
	}
	// 客户端发起图片列表请求
	else if (req.query.action === 'listimage') {
		var dir_url = '/ueditor/';
		res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
	}
	// 客户端发起其它请求
	else {
		res.setHeader('Content-Type', 'application/json');
		res.redirect('/libStatic/ueditor-utf8-php/php/config.json')  //这里的路径要加载对否则就不能上传图片。如果你下载的是JSP那就对应jsp目录
	}
}));
//图片上传配置



//如果是测试环境就使用webpack热加载服务器
if (isDev) {
	require('../webpack.dev.server.js')(app);
}

//提供静态资源的访问 例如：localhost:30000/static/demo.js 会直接返回src下的demo.js文件
//使用path模块的normalize可以将window和linux的路径进行统一
app.use('/build',express.static(path.normalize(__dirname+'/../build')));
app.use('/adminStatic',express.static(path.normalize(__dirname+'/../admin/src')));
app.use('/libStatic',express.static(path.normalize(__dirname+'/../lib')));
app.use('/ueditor',express.static(path.normalize(__dirname+'/../images/ueditor')));

var webIndex = isDev === true ?'':'./build/index.html';

//路由,默认客户端，admin为后台，需要账号密码登录
app.all('/',function(req,res){
	if(isDev){
		res.send('开发环境请访问http://localhost:3100')
	}else{
		res.sendfile(webIndex);
	}
});
app.all('/admin',function(req,res){
	res.sendfile('./admin/index.html');
});
app.use('/demo',demoRouter);
app.use('/blog',blogRouter);
app.all('/demo2',function(req,res){
	res.send('demo2');
});

app.listen(3000,function(){
	console.error('> Web server listen 3000......');
});