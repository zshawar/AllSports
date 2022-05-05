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
body('date', 'Date cannot be empty and has to be after today\'s date').notEmpty().isDate().isAfter(new Date().toDateString()).trim().escape(),
body('start', 'Start Time cannot be empty').notEmpty().trim().escape().matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
body('end', 'End Time cannot be empty').notEmpty().trim().escape().matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
body('image', 'Image cannot be empty').notEmpty().trim()
];


// Middleware for start and end time
exports.validateTime = body('end').custom((end,{req})=>{
    let start = req.body.start;
    let startMin = start.split(":")[0]+ start.split(":")[1];
    let endMin = end.split(":")[0] + end.split(":")[1];
    console.log(startMin);
    console.log(endMin);
    if (endMin <= startMin){
        throw new Error('Start time needs to be before end time');
    } else {
        return true;
    }
});

exports.validateRSVP= [body('answer', 'RSVP cannot be empty').notEmpty(),
body('answer', 'RSVP must be Yes, No, or Maybe').toUpperCase().isIn(['YES', 'NO', 'MAYBE']).trim().escape()];