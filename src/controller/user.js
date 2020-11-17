const { exec } = require('../server/db/mysql')

const loginCheck = (user, password) => {
    const sql = `
        select userName, realName from users where userName='${user}' and passWord='${password}'
    `
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    loginCheck
}
