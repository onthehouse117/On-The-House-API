/* On-The-House API  */
require('./db/mongoose');
const express = require('express');
/* All the routers*/
const userRouter = require('./routers/users');
const postRouter = require('./routers/posts');
const adminRouter = require('./routers/admin');

/*Middleware*/
const cors = require('cors');
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000;

// Enable cross-origin requests.
app.use(cors());
app.options('*', cors());

//Enable dev logging
app.use(morgan('dev'))

app.use(express.json())

app.use(userRouter);

app.use(postRouter);
app.use(adminRouter);

app.use(cors());


/* Basic test endpoint. Note: If app using JSON as means of communication, this endpoint will NOT work */
app.post('/test', (req, res) => {
    //console.log('Ran test endpoint')
    res.send('This is my test router')
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})
