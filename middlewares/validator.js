const {body} = require('express-validator');
const {validationResult} = require('express-validator');

exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters.').isLength({min:8, max:64})];

exports.validateLogIn = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters.').isLength({min:8, max:64})];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(error=>{
            req.flash('error', error.msg)
        });
        return res.redirect('back');
    } else {
        return next();
    }
}

exports.validateEvent = [body('sport', 'Sport cannot be empty').notEmpty().trim().escape(), 
body('title', 'Title cannot be empty').notEmpty().trim().escape(),
body('details', 'Content needs a minimum length of 10 characters').isLength({min:10}).trim().escape(),
body('location', 'Location cannot be empty').notEmpty().trim().escape(),
body('date', 'Date cannot be empty').notEmpty().trim().escape(),
body('start', 'Start Time cannot be empty').notEmpty().trim().escape(),
body('end', 'End Time cannot be empty').notEmpty().trim().escape(),
body('image', 'Image cannot be empty').notEmpty().trim()
];


// Middleware for start and end time
exports.validateTime = [body('start').matches('/^(0[0-9]1[0-9]2[0-3]):[0-5][0-9]$/'),
body('end').custom((end,{req})=>{
    let start = req.body.start;
    let startMin = parseInt(start.split((":")[0])*60) + parseInt(start.split((":")[1]));
    let endMin = parseInt(end.split((":")[0])*60) + parseInt(end.split((":")[1]));
    if (endMin < startMin){
        
    }
})]