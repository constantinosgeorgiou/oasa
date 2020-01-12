const path = require('path')
const PORT = process.env.PORT || 5000
const dotenv = require('dotenv')
const { Pool } = require('pg')
const express = require('express')
const app = express()

// Configurations
dotenv.config()

// Connect to database
const connectionString = process.env.DATABASE_URL

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))