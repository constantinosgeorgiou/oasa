const express = require("express")
const router = express.Router()

// Connect to database
const {
    pool
} = require('../migrations/config')

router.get('/24ora', (request, response) => response.render('pages/routes/routes24'))
router.get('/airport', (request, response) => response.render('pages/routes/routesairport'))


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
router.post('/', (request, response) => {
    const {
        search_route
    } = request.body
    console.log(search_route)
    const sql = 'SELECT * FROM routes WHERE route_name=$1'
    // let route_name = request.params.route
    pool.query(sql, [search_route], (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        response.redirect('/routes/' + search_route)
    })
})
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
            route: results.rows[results.rowCount - 1]
        })
    })
})







module.exports = router;