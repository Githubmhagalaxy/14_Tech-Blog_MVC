const {Users, Posts, Comments} = require('../db/index');
const {sessionChecker} = require('../config/functions');

module.exports = {
    getIndex: async (req, res) => {
        try {
            const posts = await Posts.findAll({
                include: [Users],
                raw: true,
                nest: true
            });
            res.render('index/index', {title: 'The Tech Blog', posts, isLoggedIn: sessionChecker(req)})
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: 'The Tech Blog',
                isLoggedIn: sessionChecker(req),
                message: "Somethin went wrong!! please try again",
                href: "/",
                anchor: "try again"
            });
        }
    },
    getSinglePost: async (req, res) => {
        try {
            let post = await Posts.findOne({
                where: {
                    id: req.params.id
                },
                include: [Users, {
                    model: Comments,
                    include: [Users]
                }]
            });
            post = post.toJSON();
            res.render('index/singlePost', {title: `The Tech Blog | ${post.title}`, post, isLoggedIn: sessionChecker(req)})
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: `The Tech Blog | Post with id:${req.params.id}`,
                isLoggedIn: sessionChecker(req),
                message: "Somethin went wrong!! please try again",
                href: `/post/${req.params.id}`,
                anchor: "try again"
            });
        }
    },
    postCommentInSinglePost: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                const {text} = req.body;
                await Comments.create({
                    text,
                    user_id: req.session.user.id,
                    post_id: req.params.id
                });
                res.redirect(`/post/${req.params.id}`);
            } else {
                res.redirect('/signin');
            }
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: `The Tech Blog | Post with id:${req.params.id}`,
                isLoggedIn: sessionChecker(req),
                message: "Something went wrong!! please try again",
                href: `/post/${req.params.id}`,
                anchor: "try again"
            });
        }
    },
    getSignIn: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                res.redirect('/dashboard');
            } else {
                res.render('index/signin', {title: 'The Tech Blog | Sign in', isLoggedIn: sessionChecker(req)})
            }
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: 'The Tech Blog | Sign in',
                isLoggedIn: sessionChecker(req),
                message: "Somethin went wrong!! please try again",
                href: "/signin",
                anchor: "try again"
            });
        }
    },
    postSignIn: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                res.json({
                    message: "you are already logged in! please logout first",
                    href: "/logout"
                });
            } else {
                const {username, password} = req.body;
                const user = await Users.findOne({
                    where: {
                        username: username
                    }
                });
                if(user.validPassword(password)) {
                    req.session.user = user.dataValues;
                    res.redirect('/dashboard');
                } else {
                    res.render('error', {
                        title: 'The Tech Blog | Sign in',
                        isLoggedIn: sessionChecker(req),
                        message: "username or password is not correct! please try again",
                        href: "/signin",
                        anchor: "try again"
                    });
                }
            }
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: 'The Tech Blog | Sign in',
                isLoggedIn: sessionChecker(req),
                message: "username or password is not correct! please try again",
                href: "/signin",
                anchor: "try again"
            });
        }
    },
    getSignUp: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                res.redirect('/dashboard');
            } else {
                res.render('index/signup', {title: 'The Tech Blog | Sign Up', isLoggedIn: sessionChecker(req)})
            }
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: 'The Tech Blog | Sign Up',
                isLoggedIn: sessionChecker(req),
                message: "Something went wrong!! please try again",
                href: "/signup",
                anchor: "try again"
            });
        }
    },
    postSignUp: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                res.json({
                    message: "you are already logged in! please logout first",
                    href: "/logout"
                });
            } else {
                const user = await Users.create(req.body)
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: 'The Tech Blog | Sign Up',
                isLoggedIn: sessionChecker(req),
                message: "Something went wrong! please try again",
                href: "/signup",
                anchor: "try again"
            });
        }
    },
    getSignOut: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                res.clearCookie('user_sid');
                res.redirect('/');
            } else {
                res.render('index/signin', {title: 'The Tech Blog | Sign In', isLoggedIn: sessionChecker(req)})
            }
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: 'The Tech Blog | Sign Out',
                isLoggedIn: sessionChecker(req),
                message: "Something went wrong!! please try again",
                href: "/signout",
                anchor: "try again"
            });
        }
    },
}