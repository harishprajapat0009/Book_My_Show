const { log } = require('console');
const Movie = require('../models/MovieModal');
const path = require('path');

module.exports.home = async (req, res) => {
    try{

         // Pagination
        let perPage = 5;
        let Page = 0;

        if(req.query.page){
            Page = req.query.page;
        }

        // Search
        let Search = '';
        if(req.query.searchMovie){
            Search = req.query.searchMovie;
        }

        let MovieData = await Movie.find({
            $or : [
                {title : {$regex : Search, $options : 'i'}},
                {language : {$regex : Search, $options : 'i'}}
            ]
        }).skip(Page * perPage).limit(perPage);

        // For Dynamic Pagination
        let totalMovies = await Movie.find({
            $or : [
                {title : {$regex : Search, $options : 'i'}},
                {language : {$regex : Search, $options : 'i'}}
            ]
        }).countDocuments();

    let TotalCounts = Math.ceil(totalMovies/perPage);

        return res.render('Home', {
            MovieData,
            Page, 
            TotalCounts,
            Search
        });
    }
    catch{
        console.log("Data not found..");
    }
}

module.exports.addMovie = async (req, res) => {
    res.render('AddMovie');
}

module.exports.insertData = async (req, res) => {

    var cvImgPath = '';
    var bgImgPath = '';
    if(req.files){
        cvImgPath = Movie.cvImgPath+'/'+req.files.coverImage[0].filename;
        bgImgPath = Movie.cvImgPath+'/'+req.files.bgImage[0].filename;
    }
    req.body.coverImage = cvImgPath;
    req.body.bgImage = bgImgPath;

    await Movie.create(req.body);
    res.redirect('/');
};

module.exports.viewData = async(req, res) => {
    try{
        let singleObj = await Movie.findById(req.query.id)
        return res.render('ViewData',{
            singleObj
        });
    }
    catch{
        console.log("Data not found..");
        return res.render('/');
    }
};

module.exports.addComment = async (req, res) => {
   try{
    let singleData =await Movie.findById(req.body.id);
    console.log(req.body);
    

    singleData.comments.push(req.body.comments);

    await Movie.findByIdAndUpdate(req.body.id, singleData);
    return res.redirect('back')
   }
   catch{
    console.log("Something went wrong..");
    return res.redirect('back');
   }
}