const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');
const events = [
    {
        id: '1',
        sport: 'Soccer',
        title: '4X4 Soccer Pickup Game',
        host: 'Zaina',
        details: 'Join us at the Morrison YMCA.',
        location: 'Morrison YMCA',
        date: '2022-02-18',
        start: '14:00',
        end: '15:00',
        image: '/images/soccerGame.png'
    },
    {
        id: '2',
        sport: 'Soccer',
        title: 'Soccer Drills',
        host: 'Paige',
        details: 'Cone and shooting drills to improve our skills.',
        location: 'UREC Field 7',
        date: '2022-03-01',
        start: '16:00',
        end: '17:00',
        image: '/images/soccerDrills.jpg'
    },
    {
        id: '3',
        sport: 'Soccer',
        title: 'World Cup',
        host: 'Kyle',
        details: 'Pick a country and come play world cup! Last one standing wins!',
        location: 'Brace YMCA',
        date: '2022-03-01',
        start: '18:00',
        end: '19:00',
        image: '/images/soccerWorldCup.jpg'
    },
    {
        id: '4',
        sport: 'Basketball',
        title: 'Knockout',
        host: 'Zaina',
        details: 'Come play a few games of knock out to get practice shooting!',
        location: 'Belk Gym',
        date: '2022-02-28',
        start: '14:00',
        end: '15:00',
        image: '/images/basketballKnockout.jpg'
    },
    {
        id: '5',
        sport: 'Basketball',
        title: '5x5 Full Court Game',
        host: 'Sarah',
        details: 'Join a game of basketball for fun. All skill levels are welcome.',
        location: 'Brace YMCA',
        date: '2022-03-01',
        start: '18:00',
        end: '19:00',
        image: '/images/basketballGame.png'
    },
    {
        id: '6',
        sport: 'Basketball',
        title: '3X3 Half Court Tournament',
        host: 'Mike',
        details: 'Many teams will play, only one will be 1st.',
        location: 'Morrison YMCA',
        date: '2022-03-01',
        start: '18:00',
        end: '19:00',
        image: '/images/basketballHalfcourt.jpg'
    },
    {
        id: '7',
        sport: 'Kickball',
        title: '5X5 Adult Kickball Tournament',
        host: 'Ken',
        details: 'Join us at the Morrison YMCA on the baseball fields',
        location: 'Morrison',
        date: '2022-03-05',
        start: '12:00',
        end: '14:00',
        image: '/images/kickballAdult.jpg'
    },
    {
        id: '8',
        sport: 'Kickball',
        title: '6X6 Highschool Game',
        host: 'Kelly',
        details: 'Meet up at Ardrey Kell for a fun team game. We will be checking school ids',
        location: 'Ardrey Kell',
        date: '2022-03-05',
        start: '12:00',
        end: '14:00',
        image: '/images/kickballHighschool.jpg'
    },
    {
        id: '9',
        sport: 'Kickball',
        title: 'Kickball Tournament',
        host: 'Charlie',
        details: 'Smaller fields for more games and competition.',
        location: 'Morrison Baseball Fields',
        date: '2022-03-06',
        start: '18:00',
        end: '19:00',
        image: '/images/kickball.png'
    }
    
];

exports.find = () => events;

exports.category = () => {
    const mySports = new Set();
    events.forEach(event => {
        mySports.add(event.sport);
    });
  
    let arr = [...mySports];
    return arr;
    
};


exports.filter = topic => events.filter(event => topic === event.sport);



exports.findById = id => events.find(event=>event.id === id);

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