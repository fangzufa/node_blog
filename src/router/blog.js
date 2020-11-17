const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog
} = require('../controller/blog')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author
        const keyword = req.query.keyword

        return getList(author, keyword).then(listData => {
            // SuccessModel 也是个 promise
            return new SuccessModel(listData)
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
        const author = 'bamboo' //假数据
        req.body.author = author
        return newBlog(req.body).then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        return updataBlog(id, req.body).then(result => {
            return result ? new SuccessModel() : new ErrorModel('更新博客失败')
        })

    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const author = 'bamboo' //假数据
        return delBlog(id, author).then(result => {
            return result ? new SuccessModel() : new ErrorModel('删除博客失败')
        })
    }
}

module.exports = handleBlogRouter