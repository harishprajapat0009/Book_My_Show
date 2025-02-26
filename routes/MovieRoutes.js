const express = require('express');

const routes = express.Router();

const movieCtl = require('../controllers/MovieController');

const Movie = require('../models/MovieModal');

routes.get('/', movieCtl.home);
routes.get('/addMovie', movieCtl.addMovie);
routes.post('/insertData', Movie.uploadImageFile, movieCtl.insertData);
routes.get('/viewData', movieCtl.viewData);
routes.post('/addComment', movieCtl.addComment);

module.exports = routes;
