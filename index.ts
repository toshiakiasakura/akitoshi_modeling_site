import createHttpError from "http-errors"
import express from 'express'
import { Request, Response, NextFunction } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import bodyParser from 'body-parser'

import { router as indexRouter } from './routes/index'
import { userRouter } from './routes/users'
import { modelRouter } from './routes/model.route'

const app = express();

/**
 * In developmental and production stage, CORS policy errors should be
 * avoided. These setHeader methods are placed for this purpose.
 * If you add specific header, you should also its key header value
 * to Access-Control-Allow-Headers.
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods", "POST, GET")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
  next()
})

/**
 + body parser for json
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

/**
 * Routine part.
 */
app.use("/api/", indexRouter)
app.use("/api/users", userRouter)
app.use("/api/models", modelRouter)


/**
 * Serve the static files from the React app
 */
app.use(express.static(path.join(__dirname, '/../client/build')))

/**
 * Handles any requests that don't match the ones above
 */
app.get('*', (req:Request,res:Response) =>{
  console.log(path.join(__dirname, '/../client/build/index.html'))
  res.sendFile(path.join(__dirname, '/../client/build/index.html'))
})

const port = 3002
app.listen(port)
console.log('App is listening on port ' + port)