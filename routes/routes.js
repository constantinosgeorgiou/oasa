const express = require("express")
const router = express.Router()

// Connect to database
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

// 24hr - Show all 24/7 routes
router.get('/24hr', (request, response) => {
    pool.query('SELECT * FROM routes WHERE is24hr=TRUE', (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        console.log("\n\n RETRIEVED\n ---------\n\n", results.rows)
        response.render('pages/routes/routes24', {
            routes: results.rows,
            page: 'routes'
        })
    })
})


// AIRPORT - Show all airport routes
router.get('/airport', (request, response) => {
    pool.query('SELECT * FROM routes WHERE isairportroute=TRUE', (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        console.log("\n\n RETRIEVED\n ---------\n\n", results.rows)
        response.render('pages/routes/routesairport', {
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
    const sql = 'SELECT * FROM routes WHERE rname=$1'
    // let rname = request.params.route
    pool.query(sql, [search_route], (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        response.redirect('/routes/' + search_route)
    })
})
router.get('/:route', (request, response) => {
    const retrieveRoute = 'SELECT * FROM routes WHERE rname=$1'
    const retrieveStops = 'SELECT sname FROM stops WHERE id=$1'
    let rname = request.params.route
    pool.query(retrieveRoute, [rname], (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        // console.log(results.rows[0].stops)
        // let stopsArray = new Array(results.rows[0].stops.length)
        // Retrieve route stops
        // for (let eachStop = 1; eachStop <= results.rows[0].stops.length; eachStop++) {
        //     console.log(results.rows[0].stops)
        //     console.log(results.rows[0].stops.pop())

        // let id = results.rows[0].stops.pop()
        // console.log(id)

        // }
        // results.rows[0].stops.forEach(eachStop => {
        //     console.log(results.rows[0].stops)
        //     // console.log(results.rows[0].stops[eachStop])
        //     let id = results.rows[0].stops.pop()
        //     console.log(id)

        // });
        // pool.query(retrieveStops, [eachStop], (error, result) => {

        //     if (error) {
        //         console.log(error)
        //         throw error
        //     }
        //     console.log(result.rows[0])
        //     // stopsArray.push(result.rows[0].sname)
        //     // console.log("name", stopsArray[stop])
        // })
        // results.rows[0].stops.forEach(stop => {
        // })
        // console.log("\n RETRIEVED\n ---------\n\n", results.rows)
        // console.log(stopsArray)

        response.render('pages/routes/show', {
            route: results.rows[results.rowCount - 1]
        })
    })
})







module.exports = router;