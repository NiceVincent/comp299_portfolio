let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// user model
let UserModel = require('../models/user');
let User = UserModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { 
        title: 'Home',
        pageName: 'pages/home',
        displayName: req.user ? req.user.displayName : ''
    });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { 
        title: 'About me',
        pageName: 'pages/aboutMe',
        displayName: req.user ? req.user.displayName : ''
    });
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { 
        title: 'Projects', 
        pageName: 'pages/projects',
        displayName: req.user ? req.user.displayName : ''
    });
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', {
        title: 'Services',
        pageName: 'pages/services',
        displayName: req.user ? req.user.displayName : ''
    });
}

module.exports.displayContactMePage = (req, res, next) => {
    res.render('index', {
        title: 'Contact',
        pageName: 'pages/contact',
        displayName: req.user ? req.user.displayName : ''
    });
}

module.exports.displayLoginPage = (req, res, next) => {
    //check if the user is already logged in
    if (!req.user) {
        res.render('index', {
            title: "Login",
            pageName: 'auth/login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''

        })
    } else {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, User, info) => {
        //server err?
        if (err) {
            return next(err);
        }
        //is there a user login error?
        if (!User) {
            req.flash('loginMessage',
                'Authentication Error');
            return res.redirect('/login');
        }
        req.login(User, (err) => {
            //server error?
            if (err) {
                return next(err);
            }
            return res.redirect('/contactList');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    //check if the user is not already logged in*/
    if (!req.user) {
        res.render('index', {
            title: 'Register',
            pageName: 'auth/register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    //instantiate a user object*/
    let newUser = new User({
        username: req.body.username,
        //password:req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });
    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error:inserting New User");
            if (err.name == "UserExits Error") {
                req.flash('registerMessage',
                    'Registration Error: User Already Exists!');
                console.log('Error: user Already Exists')
            }

            return res.render('index', {
                title: 'Register',
                pageName: 'auth/register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        } else {
            //if no error exists, then registration is successful
            //redirect the user and authenticate them
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contactList')
            });
        }

    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}