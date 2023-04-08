const express = require('express')
const app =  express()
const connectDB =  require('./config/database')
const mainroute =  require('./routes/main')
const passport = require("passport");
const session = require("express-session");
const MongoStore =  require('connect-mongo');
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const mongoose = require('mongoose')

require('dotenv').config({ path : './config/.env'})

require('./config/passport')(passport)

connectDB()

app.set('view engine',  'ejs')
app.use(express.static('public'))
app.use(express.urlencoded( { extended : true}))
app.use(express.json())
app.use(logger("dev"))
app.use(methodOverride('_method'))

app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : false,
    store : MongoStore.create({
        mongoUrl : process.env.DB_STRING
    })
}))


app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', mainroute)



app.listen(process.env.PORT, () => {
    console.log('Server is running')
})