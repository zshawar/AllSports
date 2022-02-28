const { redirect } = require('express/lib/response');
const model = require('../models/event');

//GET /events: send all events to the user
exports.index = (req, res) => {
    // res.send('send all events');
    let events = model.find();
    let soccer = model.filter('Soccer');
    let basketball = model.filter('Basketball');
    let kickball = model.filter('Kickball');
    res.render('./event/index', {events, soccer, basketball, kickball});
};

//GET /events/new: send html form for creating a new event
exports.new =  (req, res) => {
    res.render('./event/new');
};

//POST /events: create a new event
exports.create = (req, res) => {
    // res.send('Created a new event');
    let event = req.body;
    model.save(event);
    res.redirect('/events');
};

//GET /events/:id: send details of event identified by id
exports.show = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if(event) {
        res.render('./event/show', {event});
    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
    
    
};

//GET /events/:id/edit: send html form for editing an existing event
exports.edit = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if(event) {
        res.render('./event/edit', {event});
    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
    
};

//PUT /events/:id: Update event identified by id
exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;
    if(model.updateById(id, event)){
        res.redirect('/events/'+id);
    }
    else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};

//DELETE /events/:id: delete the event identified by id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/events');
    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }

};
