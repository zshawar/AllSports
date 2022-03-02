//require modules
const express = require('express');
const morgan = require('morgan');
const eventRoutes = require('./routes/eventRoutes');
const mainRoutes = require('./routes/mainRoutes');
const methodOverride = require('method-override');

//create application
const app = express();

//configure application
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');


//mount middleware functions
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));



//set up routes
// app.get('/', (req, res) => {
//     res.render('index');
// });

app.use('/events', eventRoutes);

app.use('/', mainRoutes);

app.use((req, res, next) => {
    let err = new Error('Server cannot locate resource at ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});

//start the server
app.listen(port, host, ()=> {
    console.log('Server is running on port', port);
});