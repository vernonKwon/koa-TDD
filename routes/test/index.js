const router = require('koa-router')()

const success = { status: "success" }
const fail = { status: "fail" }

router.get('/success', ctx => {
    ctx.body = success
})

router.get('/fail', ctx => {
    ctx.body = fail
})

module.exports = router
