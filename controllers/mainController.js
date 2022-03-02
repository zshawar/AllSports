const { redirect } = require('express/lib/response');


//GET /: send home page to the user
exports.index = (req, res) => {
    
    res.render('./index');
};

//GET /about: send about page
exports.about =  (req, res) => {
    res.render('./about');
};

//GET /contact: send contact page
exports.contact =  (req, res) => {
    res.render('./contact');
};
