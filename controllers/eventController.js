const { redirect } = require('express/lib/response');
const model = require('../models/event');
const { DateTime } = require('luxon');

//GET /events: send all events to the user
exports.index = (req, res, next) => {
    // res.send('send all events');
    model.find()
    .then(events=>{
        let sports = model.distinct('sport');
        console.log(sports);
        res.render('./event/index', {events, sports, DateTime});
    })
    .catch(err=>next(err));
    
    
};

//GET /events/new: send html form for creating a new event
exports.new =  (req, res) => {
    res.render('./event/new');
};

//POST /events: create a new event
exports.create = (req, res, next) => {
    // res.send('Created a new event');
    let event = req.body;
    model.save(event)
    .then(result=> res.redirect('/events'))
    .catch(err=>next(err));
   
};

//GET /events/:id: send details of event identified by id
exports.show = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(event=>{
        if(event) {
            res.render('./event/show', {event, DateTime });
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
        if(event) {
            res.render('./event/edit', {event});
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
    
    
};

//PUT /events/:id: Update event identified by id
exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;

    model.updateById(id, event)
    .then(result=>{
        if(result.modifiedCount === 1){
            res.redirect('/events/'+id);
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

//DELETE /events/:id: delete the event identified by id
exports.delete = (req, res, next)=>{
    let id = req.params.id;

    model.deleteById(id)
    .then(result => {
        if(result.deletedCount === 1){
            res.redirect('/events');
        }else{
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
    
    
};
