// Geng Wei, Tu | 301337045
let mongoose = require('mongoose');
let contactsModel = mongoose.Schema({
    name: String,
    phone: String,
    email: String,
}, {
    collection: "contact"
});

module.exports = mongoose.model('contact', contactsModel);