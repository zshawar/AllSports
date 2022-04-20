const express = require('express');
const controller = require('../controllers/eventController');
const {isLoggedIn, isHost} = require('../middlewares/auth');
const{validateId, validateEvent} = require('../middlewares/validator');

const router = express.Router();

//GET /events: send all events to the user
router.get('/', controller.index);

//GET /events/new: send html form for creating a new event
router.get('/new', isLoggedIn, controller.new);

//POST /events: create a new event
router.post('/', isLoggedIn, validateEvent, controller.create);

//GET /events/:id: send details of event identified by id
router.get('/:id', validateId, controller.show);

//GET /events/:id/edit: send html form for editing an existing event
router.get('/:id/edit', validateId, isLoggedIn, isHost, controller.edit);

//PUT /events/:id: Update event identified by id
router.put('/:id', validateId, isLoggedIn, isHost, validateEvent, controller.update);

//DELETE /events/:id: delete the event identified by id
router.delete('/:id', validateId, isLoggedIn, isHost, controller.delete);


module.exports = router;