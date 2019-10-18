/* On-The-House API  */
const user = require('../routers/users');
const express = require('express')

const app = express()
const port = 3000

//app.use(express.json)
app.use(user);

/* Basic test endpoint. Note: If app using JSON as means of communication, this endpoint will NOT work */
app.post('/test', (req, res) => {
    console.log('Ran test endpoint')
    res.send('This is my test router')
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})
