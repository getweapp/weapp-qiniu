/*
* 作者：刘焱旺 yw@getweapp.com
* 答疑交流QQ群：499859691
*/

// api服务
const Restify = require('restify')
const Server = Restify.createServer()
Server.use(Restify.queryParser())
Server.use(Restify.bodyParser())

// qiniu
import qiniu from 'qiniu'

// 监听端口号
const PORT = 9885

qiniu.conf.ACCESS_KEY = 'xxxx'; // 你的七牛帐户的ACCESS_KEY
qiniu.conf.SECRET_KEY = 'xxxx'; // 你的七牛帐户的SECRET_KEY

const bucket = 'xxxx'; // 你的七牛帐户的bucket

/********** 业务处理开始 **********/

// 获取uptoken
Server.get('/uptoken', (req, res) => {
	const putPolicy = new qiniu.rs.PutPolicy(bucket)
	const uptoken = putPolicy.token()
	console.log('get token:', uptoken)
	res.send({
		code: 0,
		uptoken: uptoken
	})
})

/********** 业务处理结束 **********/

// 监听端口开启api服务
Server.listen(PORT, () => {
	console.log('开启服务器，端口号：', PORT)
})
