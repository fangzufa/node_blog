const express = require('./like-express')

const app = express()

app.use((req, res, next) => {
    console.log('请求开始...', req.method, req.url)
    next()
})

app.use((req, res, next) => {
    // 假设处理 cookie
    console.log('处理cookie...', req.method, req.url)
    req.cookie = {
        userId: 'bamboo'
    }
    next()
})

app.use('/api', (req, res, next) => {
    console.log('处理api路由...', req.method, req.url)
    next()
})

app.get('/api/get-cookie', (req, res, next) => {
    console.log('处理api/get-cookie路由...', req.method, req.url)
    res.json({
        erron: 0,
        userId: req.cookie.userId
    })
    next()
})

app.listen(8000, () => {
    console.log('listen 8000 ...')
})