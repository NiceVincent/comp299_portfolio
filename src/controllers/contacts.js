let express = require('express');
//create a reference to the db Schema which is the model
let Contact = require('../models/contact');

// display the list of contact
module.exports.displayBookList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('index', {
                title: 'Contacts',
                pageName: 'contacts/list',
                contactList,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('index', {
        title: 'Add Business Contact',
        pageName: 'contacts/add',
        displayName: req.user ? req.user.displayName : ''
    })
}

module.exports.processAddPage = (req, res, next) => {
    const newContact = Contact({
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email,
    });
    Contact.create(newContact, (err, contact) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/contactList');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Contact.findById(id, (err, contactEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('index', {
                title: 'Edit Contact',
                pageName: 'contacts/edit',
                contact: contactEdit,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id
    let updatedContact = Contact({
        "_id": id,
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email,
    });
    console.log('req.body.price', req.body)
    Contact.updateOne({
        _id: id
    }, updatedContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/contactList');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Contact.remove({
        _id: id
    }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/contactList');
        }
    });
}