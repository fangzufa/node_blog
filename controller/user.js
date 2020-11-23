const { exec, escape } = require('../server/db/mysql')
const { genPassword } = require('../utils/crypto')

const loginCheck = async (user, password) => {
    user = escape(user)
    password = genPassword(password)
    password = escape(password)
    const sql = `
        select userName, realName from users where userName=${user} and passWord=${password}
    `
    const rows = await exec(sql)
    return rows[0] || {}
}

const registerCheck = async (user, password, realname) => {
    user = escape(user)
    password = genPassword(password)
    password = escape(password)
    realname = escape(realname)
    const sql = `
        insert into users ( userName, passWord, realName) 
        values (${user}, ${password}, ${realname});
    `
    const sql1 = `
        select userName, realName from users where userName=${user} and passWord=${password}
    `
    const insertData = await exec(sql)
    const loginData = await exec(sql1)
    return {
        userName: loginData[0].userName,
        realName: loginData[0].realName,
        id: insertData.insertId
    }
}

module.exports = {
    loginCheck,
    registerCheck
}
