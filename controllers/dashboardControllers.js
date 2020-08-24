const {Users, Posts, Comments} = require('../db/index');
const {sessionChecker} = require('../config/functions');

module.exports = {
    getIndex: async (req, res) => {
        try {
            if(!sessionChecker(req)) {
                res.redirect('/signin');
            }
            let posts = await Posts.findAll({
                where: {
                    user_id: req.session.user.id
                },
                raw: true
            });
            res.render('dashboard/index', {title: 'The Tech Blog | Dashboard', posts, isLoggedIn: sessionChecker(req)})
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: 'The Tech Blog | Dashboard',
                isLoggedIn: sessionChecker(req),
                message: "Something went wrong!! please try again",
                href: "/dashboard",
                anchor: "try again"
            });
        }
    },
    getNewPost: async (req, res) => {
        try {
            if(!sessionChecker(req)) {
                res.redirect('/signin');
            }
            res.render('dashboard/newPost', {title: 'The Tech Blog | Add New Post', isLoggedIn: sessionChecker(req)})
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: 'The Tech Blog | New Post',
                isLoggedIn: sessionChecker(req),
                message: "Something went wrong!! please try again",
                href: "/dashboard/newPost",
                anchor: "try again"
            });
        }
    },
    postNewPost: async (req, res) => {
        try {
            if(!sessionChecker(req)) {
                res.redirect('/signin');
            }
            const {title, content} = req.body;
            await Posts.create({
                title,
                content,
                user_id: req.session.user.id
            })
            res.redirect('/dashboard');
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: 'The Tech Blog | New Post',
                isLoggedIn: sessionChecker(req),
                message: "Something went wrong!! please try again",
                href: "/dashboard/newPost",
                anchor: "try again"
            });
        }
    },
    getSinglePost: async (req, res) => {
        try {
            if(!sessionChecker(req)) {
                res.redirect('/signin');
            }
            let post = await Posts.findOne({
                where: {
                    id: req.params.id,
                    user_id: req.session.user.id
                },
                raw: true
            });
            res.render('dashboard/singlePost', {title: `The Tech Blog | Post ${post.title}`, post, isLoggedIn: sessionChecker(req)})
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: `The Tech Blog | post with id:${req.params.id}`,
                isLoggedIn: sessionChecker(req),
                message: "Something went wrong!! please try again",
                href: `/dashboard/post/${req.params.id}`,
                anchor: "try again"
            });
        }
    },
    putSinglePost: async (req, res) => {
        try {
            if(!sessionChecker(req)) {
                res.redirect('/signin');
            }
            await Posts.update(req.body,{
                where: {
                    id: req.params.id,
                    user_id: req.session.user.id
                }
            });
            res.redirect('/dashboard')
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: `The Tech Blog | post with id:${req.params.id}`,
                isLoggedIn: sessionChecker(req),
                message: "Something went wrong!! please try again",
                href: `/dashboard/post/${req.params.id}`,
                anchor: "try again"
            });
        }
    },
    deleteSinglePost: async (req, res) => {
        try {
            if(!sessionChecker(req)) {
                res.redirect('/signin');
            }
            await Posts.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.session.user.id
                }
            });
            res.redirect('/dashboard')
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: `The Tech Blog | post with id:${req.params.id}`,
                isLoggedIn: sessionChecker(req),
                message: "Something went wrong!! please try again",
                href: `/dashboard/post/${req.params.id}`,
                anchor: "try again"
            });
        }
    },
}
