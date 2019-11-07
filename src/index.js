/* On-The-House API  */

require('./db/mongoose');
const express = require('express');

/* All the routers*/

const userRouter = require('./routers/users');
const postRouter = require('./routers/posts');
const adminRouter = require('./routers/admin');
const commentsRouter = require('./routers/comments')

/* Middleware */

const cors = require('cors');
const morgan = require('morgan')

/* App config */
const app = express()
const port = process.env.PORT || 3000;

/* Enable cross-origin requests */
app.use(cors());
app.options('*', cors());

/* Enable dev logging */
app.use(morgan('dev'))

/* Set the standard data-format to be JSON */
app.use(express.json())

/* Add all routers to app */

app.use(userRouter);
app.use(postRouter);
app.use(adminRouter);
app.use(commentsRouter);



/* Basic test endpoint. Note: If app using JSON as means of communication, this endpoint will NOT work */
app.post('/test', (req, res) => {
    //console.log('Ran test endpoint')
    res.send('This is my test router')
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})
