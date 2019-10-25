const mongoose = require('mongoose')

// To run mongodb /Users/giorgio/mongodb/bin/mongod --dbpath=/Users/giorgio/mongodbdata --port=27017

const connectionURL = 'mongodb://localhost:' + process.env.MONGODB_LOCALHOST_PORT + '/on-the-house'

mongoose.connect(connectionURL, {
    //Username and Password in environment variables
    //mongodb+srv://dbuser:password@cluster0-evyen.mongodb.net/test?retryWrites=true&w=majority
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})