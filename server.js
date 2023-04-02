const express = require('express')
const app =  express()
const logger = require('morgan')
const connectDB =  require('./config/database')
const mainroute =  require('./routes/main')

require('dotenv').config({ path : './config/.env'})

connectDB()

app.set('view engine',  'ejs')
app.use(express.static('public'))
app.use(express.urlencoded( { extended : true}))
app.use(express.json())
app.use(logger("dev"))

app.use('/', mainroute)



app.listen(process.env.PORT, () => {
    console.log('Server is running')
})