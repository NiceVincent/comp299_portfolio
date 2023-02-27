// Geng Wei, Tu | 301337045
let express = require('express');
let router = express.Router();

//helper function for guard purposes
function requireAuth(req, res, next) {
    //check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next();
}

// connect to our books model 
let contactsController = require('../controllers/contacts');

//GET ROUTE for the book list page -READ OPERATION
router.get('/', contactsController.displayBookList);

/*GET Route for displaying the Add Page- CREATE Operation*/
router.get('/add', requireAuth, contactsController.displayAddPage);

/* POST Route for processing the Add Page - CREATE operation*/
router.post('/add', requireAuth, contactsController.processAddPage);

/*GET Route for displaying the Edit page - UPDATE operation*/
router.get('/edit/:id', requireAuth, contactsController.displayEditPage);

/*POST Route for processing the Edit page - UPDATE Operation*/
router.post('/edit/:id', requireAuth, contactsController.processEditPage);

/*GET to perform Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, contactsController.performDelete);

module.exports = router;