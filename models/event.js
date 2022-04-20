const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    sport: {type: String, required: [true, 'sport is required']},
    title: {type: String, required: [true, 'title is required']},
    host: {type: Schema.Types.ObjectId, ref: 'User'},
    details: {type: String, required: [true, 'details are required'],
            minLength:[10, 'the content should have at least 10 characters']},
    location: {type: String, required: [true, 'location is required']},
    date: {type: String, required: [true, 'date is required']},
    start: {type: String, required: [true, 'start time is required']},
    end: {type: String, required: [true, 'end time is required']},
    image: {type: String, required: [true, 'image is required']}
});

//collection name is events in the database
module.exports = mongoose.model('event', eventSchema);