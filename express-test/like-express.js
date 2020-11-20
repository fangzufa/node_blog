const http = require('http')

const slice = Array.prototype.slice

class LikeExpress {
    constructor() {
        this.routers = {
            all: [],
            get: [],
            post: []
        }
    }

    register(path) {
        const info = {}
        if (typeof path === 'string') {
            info.path = path
            // 从第二个参数开始，转换为数组，存入 stack
            info.stack = slice.call(arguments, 1)
        }
        else {
            info.path = '/'
            // 从第一个参数开始，转换为数组，存入 stack
            info.stack = slice.call(arguments, 0)
        }
        return info
    }

    use() {
        const arr = this.register.apply(this, arguments)
        this.routers.all.push(arr)
    }

    get() {
        const arr = this.register.apply(this, arguments)
        this.routers.get.push(arr)
    }

    post() {
        const arr = this.register.apply(this, arguments)
        this.routers.post.push(arr)
    }

    match(method, url) {
        let stack = []
        if (url === '/facicon.ico') {
            return stack
        }

        // 获取 routers
        let curRoutes = []
        curRoutes = curRoutes.concat(this.routers.all)
        curRoutes = curRoutes.concat(this.routers[method])

        curRoutes.forEach(routeInfo => {
            if (url.indexOf(routeInfo.path) == 0) {
                // url === '/api/get-cookie' 且 routeInfo.path === '/'
                // url === '/api/get-cookie' 且 routeInfo.path === '/api'
                // url === '/api/get-cookie' 且 routeInfo.path === '/api/get-cookie'
                stack = stack.concat(routeInfo.stack)
            }
        })

        return stack
    }

    // 核心的 next 机制
    handle(req, res, stack) {
        const next = () => {
            // 拿到第一个匹配的中间件
            const middleware = stack.shift()
            if (middleware) {
                // 执行中间件函数
                middleware(req, res, next)
            }
        }
        next()
    }

    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url
            const method = req.method.toLowerCase()

            const resultList = this.match(method, url);
            this.handle(req, res, resultList)
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = () => {
    return new LikeExpress()
}