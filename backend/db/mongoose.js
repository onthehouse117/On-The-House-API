const mongoose = require('mongoose')

// To run mongodb /Users/giorgio/mongodb/bin/mongod --dbpath=/Users/giorgio/mongodbdata --port=27017

mongoose.connect('https://localhost:27018/on-the-house', {
    useNewUrlParser: true,
    useCreateIndex: true
})
