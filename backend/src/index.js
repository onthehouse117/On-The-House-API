/* On-The-House API  */
const user = require('../routers/user');
const express = require('express')

const app = express()
const port = process.env.port || 3000

app.use(express.json)
app.use(user);

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})