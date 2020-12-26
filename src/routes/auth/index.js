const router = require('koa-router')()
const jwtMiddleware = require('../../../module/jwtMiddleware')
const jwt = require('jsonwebtoken')

const db_user_dummy = [{ userKey: 1, name: "a", id: "ida", pw: "pwa", nickname: "nicka" },
    { userKey: 2, name: 'b', id: "idb", pw: "pwb", nickname: "nickb" },
    { userKey: 3, name: 'c', id: "idc", pw: "pwc", nickname: "nickc" }
]

router.post('/signin', ctx => {
    const { id, pw } = ctx.request.body

    const newArr = db_user_dummy.filter(item => item.id === id && item.pw === pw)[0]

    ctx.cookies.set('auth', jwt.sign({ uk: newArr.userKey }, process.env.JWT_ACCESS_KEY, { expiresIn: '30m', }), { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
    ctx.body = { status: "success" }
})

router.get('/myinfo', jwtMiddleware, ctx => {
    const userKey = ctx.state.jwtDecode

    const myinfo = db_user_dummy.filter(item => item.userKey === Number(userKey))[0]
    delete myinfo.pw

    ctx.body = myinfo
})

module.exports = router
