require('dotenv').config()
import express from 'express'
import pool from './db' // postgres database
import routes from './routes'

// set up graphQL server
const {graphqlHTTP} = require('express-graphql')

//* creates an express app
const port = process.env.PORT || 4000
const app = express();
app.use(express.json());

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


// app.listen(port, () => {
//     console.log(`now listening to request from port ${port}`)
// })