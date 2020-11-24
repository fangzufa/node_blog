const http = require('http')

const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json')
    res.end(
        JSON.stringify({
            erron: 0,
            msg: 'pm2 test server1 33'
        })
    )
})

server.listen(8000, () => {
    console.log('8000 port server listening...')
})