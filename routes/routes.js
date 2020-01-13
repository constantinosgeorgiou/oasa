const express = require("express")
const router = express.Router()
const {
    pool
} = require('../migrations/config')

// INDEX - show all routes
router.get('/', (request, response) => {
    pool.query('SELECT * FROM routes', (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        console.log("\n\n RETRIEVED\n ---------\n\n", results.rows)
        response.render('pages/routes/index', {
            routes: results.rows,
            page: 'routes'
        })
    })
})

// SHOW - show more info for a specific route
router.get('/:route', (request, response) => {
    const sql = 'SELECT * FROM routes WHERE route_name=$1'
    let route_name = request.params.route
    pool.query(sql, [route_name], (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        console.log("\n\n RETRIEVED\n ---------\n\n", results.rows)
        response.render('pages/routes/show', {
            route: results.rows[results.rowCount-1]
        })
    })
})

// const addRoute = (request, response) => {
//     const {
//         route_name,
//         start_point,
//         end_point
//     } = request.body

//     pool.query('INSERT INTO routes (route_name, start_point, end_point) VALUES ($1, $2, $3)', [route_name, start_point, end_point], error => {
//         if (error) {
//             throw error
//         }
//         response.status(201).json({
//             status: 'success',
//             message: 'Route added.'
//         })
//     })
// }

// router
//     .route('/routes')
//     .get(getRoutes)
//     .post(addRoute)

module.exports = router;