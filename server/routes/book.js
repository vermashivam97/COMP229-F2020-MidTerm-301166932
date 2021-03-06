let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Book Model
let Book = require('../models/book');

let bookController = require('../controllers/book');

/* GET Route for the Book List page - READ Operation */
router.get('/', bookController.displayBookList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', bookController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', bookController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', bookController.displayEditBook);

/* POST router for the EDIT Book page - UPDATE */
router.post('/edit/:id', bookController.processBookUpdate);

/* GET router for the DELETE Book page - DELETE */
router.get('/delete/:id', bookController.performBookDeletion);

module.exports = router;