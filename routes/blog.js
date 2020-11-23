const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog
} = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')


router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
    let author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''
    const id = ctx.query.id || ''

    if (ctx.query.isadmin) {
        if (ctx.session.username == null) {
            ctx.body = new ErrorModel('未登录')
            return
        }
        author = ctx.session.username
    }
    const listData = await getList(author, keyword, id)
    let json = {
        data: listData,
        isLogin: ctx.session.username == null ? false : true,
    }

    if (ctx.session.username) {
        json.userName = ctx.session.username
    }
    ctx.body = new SuccessModel(json)
})

router.get('/detail', async (ctx, next) => {
    const data = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(data)
});

router.post('/new', loginCheck, async (ctx, next) => {
    ctx.request.body.author = ctx.session.username

    const data = await newBlog(ctx.request.body)
    ctx.body = new SuccessModel(data)
});

router.post('/update', loginCheck, async (ctx, next) => {
    const id = ctx.request.body.id
    const author = ctx.session.username

    const result = await updataBlog(id, ctx.request.body, author)
    ctx.body = result ? new SuccessModel() : new ErrorModel('更新博客失败,只能更新自己的博客')
});

router.post('/del', loginCheck, async (ctx, next) => {
    const id = ctx.request.body.id
    const author = ctx.session.username

    const result = await delBlog(id, author)
    ctx.body = result ? new SuccessModel() : new ErrorModel('删除博客失败,只能删除自己的博客')
});

module.exports = router
