const User = require('../models/user');
const Event = require('../models/event');
const { DateTime } = require('luxon');

// Send user to sign up page
exports.new = (req, res)=>{
    return res.render('./user/new');
};

// Create new user
exports.create = (req, res, next)=>{
    
    let user = new User(req.body);
    if(user.email)
        user.email = user.email.toLowerCase();
    user.save()
    .then(user=> {
        req.flash('success', 'Registration succeeded!');
        res.redirect('/users/login');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('back');
        }

        if(err.code === 11000) {
            req.flash('error', 'Email has been used');  
            return res.redirect('back');
        }
        next(err);
    }); 
    
};

// Get the login form
exports.getUserLogin = (req, res, next) => {
    return res.render('./user/login');
}

//Process login request
exports.login = (req, res, next)=>{
    //authenticate user's login request
    let email = req.body.email;
    if(email)
        email = email.toLowerCase();
    let password = req.body.password;
    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            req.flash('error', 'wrong email address');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.session.firstName = user.firstName;
                    req.session.lastName = user.lastName;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
            } else {
                req.flash('error', 'wrong password');      
                res.redirect('/users/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
};


// Get profile
exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([User.findById(id), Event.find({host: id})])
    .then(results=>{
        const [user, events] = results;
        Event.find({host: id}).distinct('sport')
        .then(sports =>{
            res.render('./user/profile', {user, events, sports, DateTime});
        })
        .catch(err=>next(err));
        
    })
    .catch(err=>next(err));
};

// Logout the user 
exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };