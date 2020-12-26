const router = require('koa-router')()
const jwtMiddleware = require('../../../module/jwtMiddleware')

const db_post_dummy = [{ seq: 1, title: "title a", content: "content a", date: "2020-12-24", writer: "nicka" },
    { seq: 2, title: "title b", content: "content b", date: "2020-12-25", writer: "nickb" },
    { seq: 3, title: "title c", content: "content c", date: "2020-12-26", writer: "nickc" },
    { seq: 4, title: "title d", content: "content d", date: "2020-12-26", writer: "nicka" },
    { seq: 5, title: "title e", content: "content e", date: "2020-12-26", writer: "nickb" },
    { seq: 6, title: "title f", content: "content f", date: "2020-12-27", writer: "nickc" },
    { seq: 7, title: "title g", content: "content g", date: "2020-12-27", writer: "nickc" },
    { seq: 8, title: "title h", content: "content h", date: "2020-12-27", writer: "nickd" },
    { seq: 9, title: "title i", content: "content i", date: "2020-12-28", writer: "nickd" }
]

router.get('/list/:seq', jwtMiddleware, ctx => {
    const seq = ctx.params.seq

    const board = db_post_dummy.filter(item => item.seq === Number(seq))[0]
    ctx.body = { post: board }
})

router.get('/list', jwtMiddleware, async ctx => {
    const dummy_page = ctx.query.page
    ctx.body = { postList: db_post_dummy }
})

module.exports = router
