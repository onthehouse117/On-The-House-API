const mongoose = require('mongoose')

// To run mongodb /Users/giorgio/mongodb/bin/mongod --dbpath=/Users/giorgio/mongodbdata --port=27017

mongoose.connect('mongodb://localhost:27018/on-the-house', {
    //Username and Password in environment variables
    //mongodb+srv://dbuser:password@cluster0-evyen.mongodb.net/test?retryWrites=true&w=majority
    useNewUrlParser: true,
    useCreateIndex: true
})