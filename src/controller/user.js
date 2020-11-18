const { exec } = require('../server/db/mysql')

const loginCheck = (user, password) => {
    const sql = `
        select userName, realName from users where userName='${user}' and passWord='${password}'
    `
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

const registerCheck = (user, password, realname) => {
    const sql = `
        insert into users ( userName, passWord, realName) 
        values ('${user}', '${password}', '${realname}');
    `
    return exec(sql).then(insertData => {
        loginCheck(user, password)
        return {
            id: insertData.insertId
        }
    })
}

module.exports = {
    loginCheck,
    registerCheck
}
