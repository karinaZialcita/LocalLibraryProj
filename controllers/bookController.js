var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        book_count: function(callback) {
            Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        book_instance_count: function(callback) {
            BookInstance.countDocuments({}, callback);
        },
        book_instance_available_count: function(callback) {
            BookInstance.countDocuments({status:'Available'}, callback);
        },
        author_count: function(callback) {
            Author.countDocuments({}, callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};

// Display list of all books.
exports.book_list = function(req, res, next) {

    Book.find({}, 'title author')
      .populate('author')
      .exec(function (err, list_books) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('book_list', { title: 'Book List', book_list: list_books });
      });
      
  };

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {

    async.parallel({
        book: function(callback) {

            Book.findById(req.params.id)
              .populate('author')
              .populate('genre')
              .exec(callback);
        },
        book_instance: function(callback) {

          BookInstance.find({ 'book': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.book==null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('book_detail', { title: results.book.title, book: results.book, book_instances: results.book_instance } );
    });
};

// Display book create form on GET.
exports.book_create_get = function(req, res, next) {
    // res.send('Students IMPLEMENT: Book create GET. Used to get form. Use book_form view');
    async.parallel({
        authors: function(callback){
            Author.find(callback);
        },
        genres:function(callback){
            Genre.find(callback);
        },
    }, function(err, results){
        if(err) {return next(err);}
        
        //using book_form view
        res.render('book_form',{title:'Create Book', authors:results.authors,genres:results.genres });
    }
    
    )
};



// Handle book create on POST.
exports.book_create_post = [
    // res.send('Students IMPLEMENT: Book create POST. At the end use book_detail view to display the book. For genre info of the book, only accept genre already in genre list')

    //validate fields 
    body('title').isLength({min: 1}).trim().withMessage('Book title must be specified'),
    body('author').isLength({min: 1 }).trim().withMessage('Author name must be specified').isAlphanumeric().withMessage('Author name has non-alphanumeric characters.'),
    body('summary').isLength({min:1 }).trim().withMessage('Book summary must be specified'),
    body('isbn').isLength({min:13, max:13}).withMessage('Book ISBN must be specified').isAlphanumeric().withMessage('Book ISBN has non-alphanumeric characters.'),
    body('genre').isLength({min:1}).trim().withMessage('Genre must be specified').isAlphanumeric().withMessage('Genre has non-alphanumeric characters'),

    body('title').escape(),
    body('author').escape(),
    body('summary').escape(),
    body('isbn').escape(),
    body('genre').escape(),

    (req, res, next)=>{

        const errors = validationResults(req);


        if(!errors.isEmpty()){

            res.render('book_form',{ title: 'Create Book', author: req.body, errors:errors.array() });
            return;

        }
        else {
            // Data from form is valid.

   
            var book = new Book(
                {
                    tite: req.body.title,
                    author: req.body.author,
                    isbn: req.body.isbn,
                    genre: req.body.genre
                });
            book.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(book.url);
            });


        }

    }

    

];
// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    // res.send('NOT IMPLEMENTED: Book delete GET');
    // async.parallel({

};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    // res.send('NOT IMPLEMENTED: Book delete POST');

};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};