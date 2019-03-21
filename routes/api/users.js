const express = require('express');
const router = express.Router();

//@route GET api/users/test
//@desc Tests users route
//@access Public
router.get('/test', (req, res) => res.json({ msg: "Users Works" }));

//@route GET api/users/register
//@desc Register user
//@access Public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
});

module.exports = router;