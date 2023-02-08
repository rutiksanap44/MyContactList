const express = require('express');
const path = require('path');

const db = require('./config/mongoose');

const Contact = require('./model/contact');

// this app variable will have all the functionalities of Express Js
const app = express();

const port = 6204;

// to use ejs template engine in our express project
app.set('view engine', 'ejs');

// to access the ejs file or file where you have embaded that code
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// to add js and css files as a static files
app.use(express.static(__dirname + '/files'));

// creating middlewar
app.use(function (req, res, next) {
    console.log("Middleware 1 called");
    next();
})

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

    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log('Error ${err}');
            return;
        }
        return res.render('home',
            {
                title: 'My Contact List',
                contact_list: contacts
            });
    });


});

app.get('/newhome', function (req, res) {
    return res.render('newHome', { title: 'New Home' });
});

app.get('/list', function (req, res) {
    return res.render('list', { title: 'My List' });
})

app.post('/create_contact', function (req, res) {
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log('Error in creating the contact');
            return;
        }
        console.log(newContact);
        res.redirect('back');
    });
});

// to delete the contact
app.get('/delete-contact', function (req, res) {

    let id = req.query.id;

    // this was an old process to delete the document using index of phone and then delete the document
    // let phone = req.query.phone;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if (contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // }

    // find the document using the id and delete that

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting the the document from the database");
            return;
        }
        return res.redirect('back');
    })
});

// to listen and bind the connection on the specified host and port.
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the Server ${err}`);
        return;
    }
    console.log(`My Express Server is UP and running on Port ${port}`);

})