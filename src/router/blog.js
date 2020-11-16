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
        return getList(author, keyword).then(listData=>{
            // SuccessModel 也是个 promise
            return new SuccessModel(listData)
        })
        
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id
        const data = getDetail(id)
        return new SuccessModel(data)
    }

    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updataBlog(id, req.body)
        return result ? new SuccessModel() : new ErrorModel('更新博客失败')
    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(id)
        return result ? new SuccessModel() : new ErrorModel('删除博客失败')
    }
}

module.exports = handleBlogRouter