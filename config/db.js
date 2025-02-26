const mongoose = require('mongoose');

// Online
mongoose.connect('mongodb+srv://harish_0009:Pass4mongodb@cluster0.xhvdh.mongodb.net/Movie_Modal');


const db = mongoose.connection;

db.once('open', (err) => {
    if(err) {
        console.log(err);
    }
    console.log("db is connected..")
})

module.exports = db;