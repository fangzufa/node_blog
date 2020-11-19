var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog
} = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const id = req.query.id || ''

    if (req.query.isadmin) {
        if (req.session.username == null) {
            res.json(
                new ErrorModel('未登录')
            )
            return
        }
        author = req.session.username
    }

    return getList(author, keyword, id).then(listData => {
        // SuccessModel 也是个 promise
        let json = {
            data: listData,
            isLogin: req.session.username == null ? false : true,
        }

        if (req.session.username) {
            json.userName = req.session.username
        }
        res.json(
            new SuccessModel(json)
        )
    })
});

router.get('/detail', (req, res, next) => {
    return getDetail(req.query.id).then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username

    return newBlog(req.body).then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

router.post('/update', loginCheck, (req, res, next) => {
    const id = req.body.id
    const author = req.session.username

    return updataBlog(id, req.body, author).then(result => {
        if (result) {
            res.json(
                new SuccessModel()
            )
        }
        else {
            res.json(
                new ErrorModel('更新博客失败,只能更新自己的博客')
            )
        }
    })
});

router.post('/del', loginCheck, (req, res, next) => {
    const id = req.body.id
    const author = req.session.username

    return delBlog(id, author).then(result => {
        if (result) {
            res.json(
                new SuccessModel()
            )
        }
        else {
            res.json(
                new ErrorModel('删除博客失败,只能删除自己的博客')
            )
        }
    })
});




module.exports = router;
