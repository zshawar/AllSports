const model = require('../models/event');
const RSVP = require('../models/rsvp');
const { DateTime } = require('luxon');
const validator = require('validator');

//GET /events: send all events to the user
exports.index = (req, res, next) => {
    // res.send('send all events');
    model.find()
    .then(events=>{
        model.distinct('sport')
        .then(sports=>{
            res.render('./event/index', {events, sports, DateTime});
        })
        .catch(err=>next(err));
        
    })
    .catch(err=>next(err));
    
    
};

//GET /events/new: send html form for creating a new event
exports.new =  (req, res) => {
    res.render('./event/new');
};

//POST /events: create a new event
exports.create = (req, res, next) => {
    // create new event document
    let event = new model(req.body);
    event.host = req.session.user;
    event.details = validator.unescape(event.details);
    event.sport = validator.unescape(event.sport);
    event.title = validator.unescape(event.title);
    event.location = validator.unescape(event.location);
    //insert document to database
    event.save()
    .then((event)=>{
        req.flash('success', 'Event was created successfully!');
        res.redirect('/events');
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);  
            return res.redirect('back');
        }
        next(err);
    });
   
};

//GET /events/:id: send details of event identified by id
exports.show = (req, res, next) => {
    let id = req.params.id;
    
    Promise.all([model.findById(id).populate('host', 'firstName lastName'),RSVP.count({event: id, answer:"YES"})])
    .then(results=>{
        const[event, count]  = results;
        if(event) {
            res.render('./event/show', {event, count, DateTime});
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
    
};

//GET /events/:id/edit: send html form for editing an existing event
exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(event=>{
            res.render('./event/edit', {event});
    })
    .catch(err=>next(err));
};

//PUT /events/:id: Update event identified by id
exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;
    event.details = validator.unescape(event.details);
    event.sport = validator.unescape(event.sport);
    event.title = validator.unescape(event.title);
    event.location = validator.unescape(event.location);


    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event=>{
        req.flash('success', 'You have successfully updated the event');
        res.redirect('/events/'+id);
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);  
            return res.redirect('back');
        }
        next(err);
    });
    
};

//DELETE /events/:id: delete the event identified by id
exports.delete = (req, res, next)=>{
    let id = req.params.id;


    Promise.all([model.findByIdAndDelete(id, {useFindAndModify: false}), RSVP.deleteMany({event:id})])
    .then(event => {
        req.flash('success', 'You have successfully deleted the event');
        res.redirect('/events');
    })
    .catch(err=>next(err));
    
};


//POST /events/:id/rsvp: Send rsvp request
exports.rsvp = (req, res, next) => {
    let id = req.params.id;
    let rsvpAnswer = req.body.answer;
    let attendee = req.session.user;

    
    RSVP.findOneAndUpdate({event: id, attendee: attendee}, {answer: rsvpAnswer}, {runValidators: true, new: true, upsert: true})
    .then((rsvp)=>{
        req.flash('success', 'You have successfully updated your rsvp to the event');
        res.redirect('/users/profile');
    })
    .catch(err=>next(err));
    
};