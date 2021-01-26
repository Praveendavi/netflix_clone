require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const { MONGODB_URI } = require('./config/keys')

// database connection
const mongoose = require('mongoose')

mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () =>{
    console.log('Mongodb is successfully connected')
})

mongoose.connection.on('error', () =>{
    console.log('error to connect db')
})

// models
require('./models/User')
require('./models/Auth')

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// routes
app.use(require('./routes/index'))
app.use(require('./routes/auth'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build', 'index.html'))
    })
}

app.listen(PORT, () =>{
    console.log(`Server us running on Port ${PORT}`)
})
