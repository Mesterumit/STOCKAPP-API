"use strict"
/* -------------------------------------------------------
	EXPRESS - Personnel API
------------------------------------------------------- */
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
/* ------------------------------------------------------- */
const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

const document = {
	info: {
		version: packageJson.version,
		title: packageJson.title,
		description: packageJson.description,
		termsOfService: "Stock-App/UmitMester",
		contact: { name: packageJson.author, email: "mesterumit@gmail.com" },
		license: { name: packageJson.license, },
	},
	host: `${HOST}:${PORT}`,
	basePath: '/',
	schemes: ['http', 'https'],
	consumes: ["application/json"],
	produces: ["application/json"],
	securityDefinitions: {
		Token: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'Simple Token Authentication * Example: <b>Token ...tokenKey...</b>'
		},
		Bearer: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'JWT Authentication * Example: <b>Bearer ...accessToken...</b>'
		},
	},
	security: [{ Token: [] }, { Bearer: [] }],
	definitions: {
		// Models:
		"User": require('./models/user').schema.obj,
		"Brand": require('./models/brands').schema.obj,
		"Category": require('./models/category').schema.obj,
		"Firm": require('./models/firm').schema.obj,
		"Product": require('./models/product').schema.obj,
		"Purchase": require('./models/purchase').schema.obj,
		"Sale": require('./models/sales').schema.obj,
	}
}

const routes = ['./index.js']
const outputFile = './configs/swagger.json'

// Create JSON file:
swaggerAutogen(outputFile, routes, document)