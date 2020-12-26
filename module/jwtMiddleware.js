const jwt = require('jsonwebtoken')
const filterJWT = async(ctx, next) => {
    try {
        const token = ctx.cookies.get('auth')
        ctx.state.jwtDecode = await jwt.verify(token, process.env.JWT_ACCESS_KEY).uk // jwt 검증
        await next()
    }
    catch (e) {
        ctx.status = 400
        ctx.body = { status: "fail" }
    }
}

module.exports = filterJWT
