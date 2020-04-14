var BookInstance = require('../models/bookinstance');
var Book = require('../models/book');
var async = require('async');




// Display list of all BookInstances.
exports.bookinstance_list = function(req, res, next) {
	
    BookInstance.find()
      .populate('book')
      .exec(function (err, list_bookinstances) {
        if (err) { return next(err); }
        // Successful, so render
        res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
      });
      
  };

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function(req, res) {
    // res.send('Students IMPLEMENT: BookInstance detail: ' + req.params.id + '. Use bookinstance_detail view');

    BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function(err, bookinstance){
        if (err) {return next(err);}
        if(bookinstance==null){
            var err = new Error('Error: we cant find this book');
            err.status = 404;
            return next(err);
        }       ///using book instance detail view
        res.render('bookinstance_detail',{title:'Book', bookinstance:bookinstance});

    })
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function(req, res) {
    // res.send('NOT IMPLEMENTED: BookInstance create GET');
    // Book.find({}, 'title')

};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
    // res.send('NOT IMPLEMENTED: BookInstance create POST')
];

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
    // async.parallel({
        // bookinstance:function(callback)
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
};