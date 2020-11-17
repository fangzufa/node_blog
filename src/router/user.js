const {
    loginCheck
} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleUserRouter = (req, res) => {
    const method = req.method

    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { user, password } = req.body
        return loginCheck(user, password).then(data => {
            if(data.userName){
                return new SuccessModel(data)
            }
            return new ErrorModel('登录失败！')
        })
    }
}

module.exports = handleUserRouter