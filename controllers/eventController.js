const model = require('../models/event');
const { DateTime } = require('luxon');

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
    
    model.findById(id).populate('host', 'firstName lastName')
    .then(event=>{
        if(event) {
            console.log(event);
            res.render('./event/show', {event, DateTime});
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


    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event => {
        req.flash('success', 'You have successfully deleted the event');
        res.redirect('/events');
    })
    .catch(err=>next(err));
    
};
