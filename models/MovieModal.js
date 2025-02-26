const mongoose = require('mongoose');

const path = require('path');

const coverImagePath = '/uploads';

const multer = require('multer');

const movieSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    language : {
        type : Array,
        required : true
    },
    genres : {
        type : Array,
        required : true
    },
    format : {
        type : Array,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    duration : {
        type : String,
        required : true
    },
    coverImage : {
        type : String,
        required : true
    },
    bgImage : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    comments : {
        type : Array,
        required : false
    }
});

const cvImgStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, '..', coverImagePath))
    },
    filename : (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

movieSchema.statics.uploadImageFile = multer({storage : cvImgStorage}).fields([
    {name : 'bgImage', maxCount : 1},
    {name : 'coverImage', maxCount : 1}
]);
movieSchema.statics.cvImgPath = coverImagePath;

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;