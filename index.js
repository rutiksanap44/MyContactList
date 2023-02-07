const express = require('express');
const path = require('path');


// this app variable will have all the functionalities of Express Js
const app = express();

// body parser setup
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
const port = 6204;

// to use ejs template engine in our express project
app.set('view engine', 'ejs');

// to access the ejs file or file where you have embaded that code
app.set('views', path.join(__dirname, 'views'));

// app.post()

var contactList = [
    {
        name: "Arpan",
        phone: "1111"
    },
    {
        name: "Rahul",
        phone: "2222"
    },
    {
        name: "Sagar",
        phone: "3333"
    }
]


// routes the HTTP GET Requests to the path which is being specified with the specified callback functions.
app.get('/', function (req, res) {
    return res.render('home',
        {
            title: 'My Contact List',
            contact_list: contactList
        });
});

app.get('/newhome', function (req, res) {
    return res.render('newHome', { title: 'New Home' });
});

app.get('/list', function (req, res) {
    return res.render('list', { title: 'My List' });
})

app.post('/create_contact', function (req, res) {
    // return res.redirect('/list');
    contactList.push(req.body);
    return res.redirect('/');
})

// to listen and bind the connection on the specified host and port.
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the Server ${err}`);
        return;
    }
    console.log(`My Express Server is UP and running on Port ${port}`);

})