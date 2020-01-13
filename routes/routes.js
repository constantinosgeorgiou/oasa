const express = require("express")
const router = express.Router()
// const {
//     pool
// } = require('./migrations/config')

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

router
    .route('/routes')
    .get(getRoutes)
    .post(addRoute)

module.exports = router;