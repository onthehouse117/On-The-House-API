/* This file creates the database and collections for this project. Run this only once*/
const MongoClient = require('mongodb').MongoClient

var connectionURL = 'mongodb://localhost:27018'

MongoClient.connect(connectionURL, (err, db) => {
    if (err) throw err
    var database = db.db('On-The-House')
})