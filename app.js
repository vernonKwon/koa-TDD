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
    // origin: 'https://after-magic.com', // 허락하고자 하는 요청 주소
    origin: process.env.ORIGIN
}

// 라우터 설정
router.use('/test', require('./routes/test').routes())


// 라우터 적용 전에 bodyParser(middleware) 적용

app.use(cors(options));
app.use(logger())
app.use(bodyParser())

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods())

app.listen(8000, () => {
    console.log("서버 8000")
})

module.exports = app
