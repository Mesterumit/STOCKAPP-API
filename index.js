"use strict"
require('colors');
const express = require('express')
const app = express()



/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8001

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
require('./configs/dbConnection')()
// dbConnection()

const cors = require('cors')
app.use(cors())

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())

// Call static uploadFile:
// app.use('/upload', express.static('./upload'))

// Check Authentication:
app.use(require('./middlewares/authentication'))

// Run Logger:
app.use(require('./middlewares/logger'))

// res.getModelList():
app.use(require('./middlewares/findSearchShortPage'))

/* ------------------------------------------------------- */
// Routes:

// HomePath:
// app.all('/', (req, res) => {
//     res.send({
//         error: false,
//         message: 'Welcome to Stock Management API',
//         documents: {
//             swagger: '/documents/swagger',
//             redoc: '/documents/redoc',
//             json: '/documents/json',
//         },
//         user: req.user
//     })
// })

// Routes:
// this will default to our index.js file in the routes folder
// app.use(require('./routes'))
app.use(require('./routes'))

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.