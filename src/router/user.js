const {
    loginCheck
} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleUserRouter = (req, res) => {
    const method = req.method

    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { user, password } = req.body
        console.log(user)
        const data = loginCheck(user, password)
        if (typeof data === 'boolean') {
            return new ErrorModel('登录失败！')
        }
        return new SuccessModel(data)
    }
}

module.exports = handleUserRouter