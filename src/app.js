const Koa = require('koa')
const Router = require("koa-router")
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
require('dotenv').config();

const app = new Koa()
const router = new Router()
const cors = require('@koa/cors');

const options = {
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
    origin: process.env.ORIGIN
}

// 라우터 설정
router.use('/auth', require('./routes/auth').routes())
router.use('/post', require('./routes/post').routes())

// 라우터 적용 전에 bodyParser(middleware) 적용
app.use(cors(options));
app.use(logger())
app.use(bodyParser())

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods())

// app.listen(8000, () => {
//     console.log("서버 8000")
// })

module.exports = app.listen(8000)
