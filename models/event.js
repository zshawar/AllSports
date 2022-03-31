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

exports.save =  event => {
    event.id = uuidv4();
    events.push(event);
};

exports.updateById = (id, newevent) => {
    let event = events.find(event=>event.id === id);
    if(event){
        event.sport = newevent.sport;
        event.title = newevent.title;
        event.host = newevent.host;
        event.details = newevent.details;
        event.location = newevent.location;
        event.date = newevent.date;
        event.start = newevent.start;
        event.end = newevent.end;
        event.image = newevent.image;
        
        return true;
    }
    else{
        return false;
    }
};

exports.deleteById = id => {
    let index = events.findIndex(event => event.id === id);
    if(index !== -1) {
        events.splice(index, 1);
        return true;
    }
    else {
        return false;
    }
};