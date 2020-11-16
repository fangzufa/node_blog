const loginCheck = (user, password) => {
    console.log('login',user, password)
    if(user === 'bamboo' && password === 'a123456'){
        return {
            userName: user,
            userId: 999
        }
    }
    return false
}

module.exports = {
    loginCheck
}
