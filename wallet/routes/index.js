const router = require('express').Router();

// 메인페이지
router.get('/', (req, res) => {
    res.render('index.html');
});

module.exports = router;