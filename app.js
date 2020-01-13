const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const dotenv = require('dotenv')
const {
    pool
} = require('./migrations/config')
// const {
//     Client
// } = require('pg')
// const seedDB = require('./migrations/seeds')
const app = express()


// Connect to database
// const connectionString = process.env.DATABASE_URL
// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
// });
// client.connect();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const getRoutes = (request, response) => {
    pool.query('SELECT * FROM routes', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })

}


const addRoute = (request, response) => {
    const {
        route_name,
        start_point,
        end_point
    } = request.body

    pool.query('INSERT INTO routes (route_name, start_point, end_point) VALUES ($1, $2, $3)', [route_name, start_point, end_point], error => {
        if (error) {
            throw error
        }
        response.status(201).json({
            status: 'success',
            message: 'Route added.'
        })
    })
}

app
    .route('/routes')
    .get(getRoutes)
    .post(addRoute)

// app.get('/', (req, res) => res.render('pages/index'))

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))