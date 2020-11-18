const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog
} = require('../controller/blog')

// 统一的登录验证函数
const loginTest = (req) => {
    if (!req.session || !req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const id = req.query.id || ''


        const loginResult = loginTest(req);
        if (req.query.isadmin) {
            // 登录校验

            if (loginResult) {
                return loginResult
            }
            // 强制查询自己的博客
            author = req.session.username
        }

        return getList(author, keyword, id).then(listData => {
            // SuccessModel 也是个 promise
            let json = {
                data: listData,
                isLogin: loginResult ? false : true,
                userName: req.session.username
            }
            return new SuccessModel(json)
        })
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id

        return getDetail(id).then(data => {
            return new SuccessModel(data)
        })
    }

    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        // 登录校验
        const loginResult = loginTest(req);
        if (loginResult) {
            return loginResult
        }

        req.body.author = req.session.username

        return newBlog(req.body).then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        // 登录校验
        const loginResult = loginTest(req);
        if (loginResult) {
            return loginResult
        }
        const id = req.body.id
        const author = req.session.username

        return updataBlog(id, req.body, author).then(result => {
            return result ? new SuccessModel() : new ErrorModel('更新博客失败,只能更新自己的博客')
        })

    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        // 登录校验
        const loginResult = loginTest(req);
        if (loginResult) {
            return loginResult
        }
        const id = req.body.id
        const author = req.session.username

        return delBlog(id, author).then(result => {
            return result ? new SuccessModel() : new ErrorModel('删除博客失败,只能删除自己的博客')
        })
    }
}

module.exports = handleBlogRouter