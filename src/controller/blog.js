const { exec } = require('../server/db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createTime desc;`

    // 返回 promise
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id='${id}' `;

    // 返回 promise
    return exec(sql).then(rows => {
        return rows[0]
    })

}

const newBlog = (blogData = {}) => {
    // blogData 包含title content author
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = new Date().getTime()

    const sql = `
        insert into blogs ( title, content, author, createTime) 
        values ('${title}', '${content}', '${author}', '${createTime}');
    `
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updataBlog = (id, blogData = {}) => {
    // id 时候要更新博客的id
    // blogData 是一个博客对象， 包含title content

    const title = blogData.title
    const content = blogData.content
    const createTime = new Date().getTime()
    const sql = `
        update blogs set title='${title}', content='${content}', createTime='${createTime}'  where id=${id};
    `
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    // id 时候要删除博客的id
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog
}