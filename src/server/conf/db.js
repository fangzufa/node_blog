const env = process.env.NODE_ENV  //环境变量

// 配置mysql数据
let MYSQL_CONF = {}

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'fangzf520',
        port: '3306',
        database: 'myblog'
    }
}
else if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'fangzf520',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}