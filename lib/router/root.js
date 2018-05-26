const url = require('url');
const {Router} = require('express');

const router = Router();

router.get('/', (req, res, next) => {
    let redirect_url = url.format({
        pathname: '/file'
    });

    res.redirect(redirect_url);
});

module.exports = router;
