const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');
const {ObjectId} = require('mongodb');

let events;

//reference variable to events collection in mongodb
exports.getCollection = db =>{
    events = db.collection('events');
};

exports.find = () => events.find().toArray();

exports.category = () => {
    const mySports = new Set();
    const categories = events.find();
    categories.forEach(event => {
        mySports.add(event.sport);
      
        
    });
    console.log(mySports);
    let arr = [...mySports];
    return arr;
    
};


// exports.filter = topic => events.filter(event => topic === event.sport);


exports.findById = id => events.findOne({_id: ObjectId(id)});

exports.save =  event => events.insertOne(event);

exports.updateById = (id, newevent) =>  events.updateOne({_id: Object(id)}, {$set:{sport:newevent.sport, 
    title:newevent.title, host:newevent.host, details:newevent.details, location:newevent.location,
    date:newevent.date, start:newevent.start, end:newevent.end, image:newevent.image}});
    
    

exports.deleteById = id =>  events.deleteOne({_id: ObjectId(id)});