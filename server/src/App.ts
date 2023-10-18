require('dotenv').config()
import express from 'express'
import cors from 'cors'

import pool from './db' // postgres database
import routes from './routes'
import deserializeUser from './middleware/deserializeUser'
import {log, errorLogger} from './logger'
import { get_the_line_where_this_error_occurred } from './functions/utils'


//--START-- how to use the logger for logging both errors and infos
// errorLogger.info({stanley:'my  name is stanley', lastName: 'my last name is chukwu'})

// const error = new Error('Error occurred').stack!; // this will help me to get the line where the error occurred, then we will use regular expression to capture only the information that wee need
// const capturedErrorLine = get_the_line_where_this_error_occurred({errorMessage: error})
// errorLogger.error({'lineNumber': capturedErrorLine}, 'see error message 2')
//--END--


//* creates an express app
const port = process.env.PORT || 4000
const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and HTTP authentication
    optionsSuccessStatus: 204, // Set the status for successful preflight requests
}))

//* Middlewares
// checks to see if the user is a has a valid accessToken or refreshToken
app.use(deserializeUser);

// for quick opening of port if you don't have time to wait for the database connection before opening of port
// app.listen(port, () => {
//     console.log(`now listening to request from port ${port}`)
//     routes(app)
// })

// connect to the database and then allow express to receive request
pool.connect((err: any, client: any, release: () => void) => {
    if (err) {
        return console.log('Error connecting to the postgresSQL database, because: ', err.stack)
    }

    app.listen(port, () => {
        console.log(`now listening to request from port ${port}`)
        routes(app)
    })

    release()
})