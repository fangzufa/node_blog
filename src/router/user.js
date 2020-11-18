const { loginCheck, registerCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../server/db/redis')

const handleUserRouter = (req, res) => {
    const method = req.method

    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { user, password } = req.body
        return loginCheck(user, password).then(data => {
            if (data.userName) {
                // 设置 session
                req.session.username = data.userName
                req.session.realname = data.realName || ''
                // 同步到 redis
                set(req.sessionId, JSON.stringify(req.session))
                return new SuccessModel(data)
            }
            return new ErrorModel('登录失败！')
        })
    }

    // 注册
    if (method === 'POST' && req.path === '/api/user/register') {
        const { user, password, realname } = req.body
        return registerCheck(user, password, realname).then(data => {
            return new SuccessModel(data)
        })
    }
}

module.exports = handleUserRouter