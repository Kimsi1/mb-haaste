import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import errorHandler from './errorHandler.js'
import routes from './routes.js'

const app = express()

/**
 * Middleware functions in Express are essentially the building blocks that allow you to add functionality to your application. 
 * They are executed sequentially in the order they are added to the application.
 * 
 * To load the middleware function, call app.use(), specifying the middleware function.
 * 
 * Source: https://expressjs.com/en/guide/writing-middleware.html
 */


// Express middleware: https://expressjs.com/en/resources/middleware.html

// Parse incoming JSON payloads and make the parsed data available in req.body
app.use(express.json())

// Parse incoming URL-encoded payloads, allowing for nested objects.
app.use(express.urlencoded({ extended: true }))

// Enhance security by setting various HTTP headers.
app.use(helmet())

// HTTP request logger. 'tiny' and 'combined' are examples of predefined formats.
app.use(morgan('combined'))

// Add the routes defined in the routes.js.
app.use(routes)

// Development error-handling/debugging, defined in errorHandler.js
app.use(errorHandler)


export default app

