const express = require('express');

const port = 9000;

const app = express();

const path = require('path');

const db = require('./config/db')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.urlencoded());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', require('./routes/MovieRoutes'));


app.listen(port, (err) => {
    err?console.log(err):console.log("Server is connected on port: " , port);
})