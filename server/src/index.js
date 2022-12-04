import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

import route from './routes'

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const path = require('path')
app.use('/public', express.static(path.join(__dirname, '../uploads')))
app.use('/api', route)

const PORT = process.env.API_PORT || 8080

app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`))
