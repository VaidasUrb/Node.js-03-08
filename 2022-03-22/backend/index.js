import get from './controlers/get.js'
import post from './controlers/post.js'
import deletee from './controlers/deletee.js'
import put from './controlers/put.js'

import { writeFile, readFile } from 'fs'
import express from 'express'
import cors from 'cors'

const app = express()
const database = 'database.json'

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))

app.use('/', get)
app.use('/', post)
app.use('/', deletee)
app.use('/', put)




app.listen(3003)