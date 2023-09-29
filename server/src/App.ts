require('dotenv').config()
import express from 'express'
import pool from './db' // postgres database
import routes from './routes'

// import {log, errorLogger} from './logger'
// errorLogger.info({stanley:'my  name is stanley', lastName: 'my last name is chukwu'})

// const error = new Error('Error occurred').stack!; // this will help me to get the line where the error occurred, then we will use regular expression to capture only the information that wee need
// const regex = /\(([^)]+)\)/;
// const matches = error.match(regex);
// let capturedErrorLine = ''
// if (matches) {
//     capturedErrorLine = matches[1]; // The captured text is in matches[1] - do console.log(capturedErrorLine);
// } else {
//     capturedErrorLine = ''
// }
// errorLogger.error({'lineNumber': capturedErrorLine}, 'see error message 2')

// set up graphQL server
const {graphqlHTTP} = require('express-graphql')

//* creates an express app
const port = process.env.PORT || 4000
const app = express();
app.use(express.json());

// connect to the database and then allow express to receive request
app.listen(port, () => {
    console.log(`now listening to request from port ${port}`)
    routes(app)
})
// pool.connect((err: any, client: any, release: () => void) => {
//     if (err) {
//         return console.log('Error connecting to the postgresSQL database, because: ', err.stack)
//     }

//     app.listen(port, () => {
//         console.log(`now listening to request from port ${port}`)
//         routes(app)
//     })

//     release()
// })


// app.listen(port, () => {
//     console.log(`now listening to request from port ${port}`)
// })