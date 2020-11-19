var express = require('express');
var router = express.Router();

router.post('/login', (req, res, next) => {
    const { user, password } = req.body
    res.json({
        erron: 0,
        data: {
            user,
            password
        }
    })
});

module.exports = router;
