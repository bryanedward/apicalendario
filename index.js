const express = require('express')
require('dotenv').config();
const cors = require('cors');
const dbMongoose = require('./database/config');
const app = express()
app.use(cors())
app.use(express.json())

dbMongoose()

// rutas que usara
app.use('/api', require('./routers/auth'))

app.listen(process.env.PORT,() => {
    console.log('conectado');
})