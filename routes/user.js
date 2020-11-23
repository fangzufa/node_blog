const router = require('koa-router')()
const { loginCheck, registerCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
    const { user, password } = ctx.request.body
    console.log(user, password)
    const data = await loginCheck(user, password)
    if (data.userName) {
        // 设置 session
        ctx.session.username = data.userName
        ctx.session.realname = data.realName

        ctx.body = new SuccessModel(data)
        return
    }
    ctx.body = new ErrorModel('登录失败！')
})

router.post('/register', async (ctx, next) => {
    const { user, password, realname } = ctx.request.body
    const data = await registerCheck(user, password, realname)
    ctx.session.username = data.userName
    ctx.session.realname = data.realName
    ctx.body = new SuccessModel(data)
});

// router.get('/get-session', async (ctx, next) => {
//     if (ctx.session.viewCount == null) {
//         ctx.session.viewCount = 0
//     }
//     ctx.session.viewCount++
//     const viewCount = ctx.session.viewCount
//     ctx.body = {
//         erron: 0,
//         viewCount
//     }
// })

module.exports = router
