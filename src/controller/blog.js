const { exec } = require('../server/db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createTime desc`
    
    // 返回 promise
    return exec(sql)
}

const getDetail = (id) => {
    // 先返回正确格式的假数据
    return {
        id: 1,
        title: '标题A',
        contet: '内容A',
        createTime: 1546610491112,
        author: 'zhangsan'
    }
}

const newBlog = (blogData = {}) => {
    return {
        id: 3,  //新建博客，插入到数据表里的id
    }
}

const updataBlog = (id, blogData = {}) => {
    // id 时候要更新博客的id
    // blogData 是一个博客对象， 包含title content
    console.log('update', id, blogData)
    return true
}

const delBlog = (id) => {
    // id 时候要删除博客的id
    console.log('delblog', id)
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog
}