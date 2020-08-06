const express = require('express');
const router = express.Router();
const User = require('../models/welcome');
const Blog = require('../models/blog');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/success', (req, res) => {
    res.render('pages/success');
});

router.get('/failed', (req, res) => {
    res.render('pages/failed');
});

router.post('/register', async (req, res) => {
    let fn = req.body.firstname;
    let ln = req.body.lastname;
    let em = req.body.email;
    let pw = req.body.password;
    let cpw = req.body.confirm_password;

    const user = new User({
        firstname: fn,
        lastname: ln,
        email: em,
        password: pw,
    });

    try {
        if (pw == cpw) {
            await user.save().then(res.redirect('/success'));
        } else {
            res.redirect('/failed');
        }
    } catch (error) {
        res.redirect('/failed');
    }
});
var user_logged;
router.post('/login', async (req, res) => {
    await User.findOne({ email: req.body.login_email, password: req.body.login_password }, (err, user) => {
        if (err) {
            console.log('Error has been detected');
            return res.redirect('/');
        }
        if (!user) {
            console.log('user did not exist');
            return res.redirect('/');
        }
        user_logged = String(user.id);
        console.log(user_logged);
        res.redirect('/home');
    });
});

router.get('/home', async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: 'desc' });
    await User.findOne({ _id: user_logged }, (err, user) => {
        if (err) {
            console.log('Error has been detected');
            return res.status(500).send();
        }
        if (!user) {
            console.log('user did not exist');
            return res.status(404).send();
        }

        res.render('./pages/home', { user: user, blogs: blogs });
    });
});

router.get('/profile', async (req, res) => {
    const blogs = await Blog.find({ postedBy: user_logged }).sort({ createdAt: 'desc' });
    const user = await User.findById(user_logged);
    res.render('./pages/profile', { user: user, blogs: blogs });
});

router.get('/logout', (req, res) => {
    user_logged = '';
    res.redirect('/');
});

module.exports = router;
