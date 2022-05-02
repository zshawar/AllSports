const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    attendee: {type: Schema.Types.ObjectId, ref: 'User'},
    event: {type: Schema.Types.ObjectId, ref: 'event'},
    answer: {type: String, enum:['YES', 'NO', 'MAYBE']}
});

//collection name is events in the database
module.exports = mongoose.model('rsvp', rsvpSchema);