var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');

// Display list of all Genre.
exports.genre_list = function(req, res) {
    // res.send('Students IMPLEMENT: Genre list, to display each Genre name in ascending order. Use genre_list view');

    Genre.find()
    .sort(['name', 'ascending'])///sorting genre to ascending
    .exec(function(err, list_genre){
        if(err){return next(err);}
                //usiing genre_list view 
        res.render('genre_list',{title:'Genre List', list_genre: list_genre});

    });


};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res) {
    // res.send('Students IMPLEMENT: Genre detail: ' + req.params.id + 'Use genre_detail view. You should dispaly genre name, and all books in this genre.');

    async.parallel({
        //display genre name
        genre: function(callback){
            Genre.findById(req.params.id).exec(callback);

        },
        //and all books that contain the genre
        book_genre: function(callback){
            Book.find({'genre':req.params.id}).exec(callback);
        },

    }, function(err,results){
        if(err){return next(err)}
        if(results.genre == null){
            //if the results dont contain specified genre..
            var err = new Error('This genre not found');
            err.status = 404;
            return next(err);
        }
        //on success render all genre and book details
            //using genre_detail view
        res.render('genre_detail',{title: 'Genre Detail', genre:results.genre, book_genre:results.book_genre});

    });


};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    // res.send('Bonus: Student IMPLEMENT: Genre create GET. Use genre_form view');
    //using genre_form
    res.render('genre_form',{title:'Create Genre'});
};

// Handle Genre create on POST.
exports.genre_create_post = [
    // res.send('Bonus: Student IMPLEMENT: Genre create POST. Use genre_form view');

    body('name').isLength({min: 1}).trim().withMessage('Genre should be specified'),

    body('name').escape(),

    (req,res,next) => {

        const errors = ValidityResult(req);

        var genre = new Genre(
            {name: req.body.name}
        );
        if(!errors.isEmpty()){
            res.render('genre_form',{title: 'Create Genre', genre:genre, errors:errors.array()});
            return;
        }

    }

];

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};