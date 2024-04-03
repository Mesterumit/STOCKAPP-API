"use strict"


const express = require('express')
const app = express()

require('colors')


require('dotenv').config()

const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
const MODE = process.env?.MODE || 'production'
console.log(PORT)


// asyncErrors to errorHandler
require('express-async-errors')


const {dbConnection} = require('./configs/dbConnection')
dbConnection()

const cors = require('cors')
app.use(cors())

// accept JSON
app.use(express.json())



// Run server 
const server = app.listen(PORT, console.log(`Server running in ${MODE} mode on http://${HOST}:${PORT}`.blue.underline))
// Handle rejections
// process.on('unhandledRejection', (error, promise)=>{
//     console.log(`Error: ${error.message}`.red);
//     server.close(()=>{
//         console.log(`Server Stopped!`.red.underline)
//         process.exit(1);
//     })
// })