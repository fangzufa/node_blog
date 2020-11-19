var express = require('express');
var router = express.Router();
const { loginCheck, registerCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', (req, res, next) => {
    const { user, password } = req.body
    return loginCheck(user, password).then(data => {
        if (data.userName) {
            // 设置 session
            req.session.username = data.userName
            req.session.realname = data.realName

            res.json(
                new SuccessModel(data)
            )
            return
        }
        res.json(
            new ErrorModel('登录失败！')
        )
    })
});

router.post('/register', (req, res, next) => {
    const { user, password, realname } = req.body
    return registerCheck(user, password, realname).then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

// router.get('/login-test', (req, res, next) => {
//     if (req.session.username) {
//         res.json({
//             erron: 0,
//             msg: '已登录'
//         })
//         return
//     }
//     res.json({
//         erron: -1,
//         msg: '未登录'
//     })
// })

// router.get('/session-test', (req, res, next) => {
//     const session = req.session
//     if (session.viewNum == null) {
//         session.viewNum = 0
//     }
//     session.viewNum++
//     res.json({
//         viewNum: session.viewNum
//     })
// })

module.exports = router;
