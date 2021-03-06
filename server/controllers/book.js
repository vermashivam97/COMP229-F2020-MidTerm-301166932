let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Book = require('../models/book');

module.exports.displayBookList = (req, res, next) => {
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);

            res.render('book/list', {title: 'Books', BookList: bookList});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('book/add', {title: 'Add Book'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newBook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.create(newBook, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book-list');
        }
    });

}
/* GET router for the EDIT Book page - UPDATE */
module.exports.displayEditBook =  (req, res, next) => {
    let id = req.params.id;
    Book.findById(id, (err, bookToEdit) =>{
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            // show the edit view
            res.render('book/edit', {title: 'Edit Book', book: bookToEdit})
        }
    });
};

/* POST router for the EDIT Book page - UPDATE */
module.exports.processBookUpdate = (req, res, next) => {
    let id = req.params.id;
    let updatedBook = Book ({
        _id: id,
        name: req.body.bookName,
        author: req.body.bookAuthor,
        description: req.body.bookDescription,
        published: req.body.bookPublished,
        price: req.body.bookPrice 
    });

    Book.updateOne({_id: id}, updatedBook, (err) => {
        if(err){
            console.log(err);
            res.end(err); 
        } else {
            // refresh booklist
            res.redirect('/book-list');
        }
    });
};


/* GET router for the DELETE Book page - DELETE */
module.exports.performBookDeletion =  (req, res, next) => {
    let id = req.params.id;
    Book.remove({_id: id}, (err) =>{
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh book list
            res.redirect('/book-list');
        }
    });
};