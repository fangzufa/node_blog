var express = require('express');
var router = express.Router();

router.get('/list', (req, res, next) => {
    // res.render('index', { title: 'Express' });
    res.json({
        erron: 0,
        data: [1, 2, 3]
    })
});

module.exports = router;
