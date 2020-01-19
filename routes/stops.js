const express = require("express")
const router = express.Router()

// Connect to database
const {
    pool
} = require('../migrations/config')

// INDEX - show all stops
router.get('/', (request, response) => {
    pool.query('SELECT * FROM stops', (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        console.log("\n\n RETRIEVED\n ---------\n\n", results.rows)
        response.render('pages/stops/index', {
            stops: results.rows,
            page: 'stops'
        })
    })
})

// ACCESSIBILITY - Show all stops that support accessibility
router.get('/accessibility', (request, response) => {
    pool.query('SELECT * FROM stops WHERE accessibility=TRUE', (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        console.log("\n\n RETRIEVED\n ---------\n\n", results.rows)
        response.render('pages/stops/accessibility', {
            stops: results.rows,
            page: 'stops'
        })
    })
})


// SHOW - show more info for a specific stop or all stops
router.post('/', (request, response) => {
    const {
        search_stop
    } = request.body
    const specific = 'SELECT * FROM stops WHERE sname=$1'
    const all = 'SELECT * FROM stops'
    // Decide to retrieve all stops or not
    if (search_stop === '') {
        pool.query(all, (error, results) => {
            if (error) {
                console.log(error)
                throw error
            } else {
                response.redirect('/stops')
            }
        })
    } else {
        pool.query(specific, [search_stop], (error, results) => {
            if (results.rowCount == 0) {
                request.flash('warning', "Η στάση δεν υπάρχει");
                response.redirect('back')
            } else {
                console.log(results)
                response.redirect('/stops/' + results.rows[0].id)
            }
        })
    }
})
router.get('/:id', (request, response) => {
    const retrieveStop = 'SELECT * FROM stops WHERE id=$1'
    const retrieveRoutes = 'SELECT rname FROM routes WHERE id=$1'
    let stopid = request.params.id
    pool.query(retrieveStop, [stopid], (error, results) => {
        if (results.rowCount == 0) {
            request.flash('warning', "Η στάση δεν υπάρχει");
            response.redirect('/stops')
        } else {
            response.render('pages/stops/show', {
                stop: results.rows[0]
            })
        }

        // if (error) {
        //     // console.log(error)
        //     throw error
        // }
        // // console.log(results.rows[0].stops)
        // // let stopsArray = new Array(results.rows[0].stops.length)
        // // Retrieve route stops
        // // for (let eachStop = 1; eachStop <= results.rows[0].stops.length; eachStop++) {
        // //     console.log(results.rows[0].stops)
        // //     console.log(results.rows[0].stops.pop())

        // // let id = results.rows[0].stops.pop()
        // // console.log(id)

        // // }
        // // results.rows[0].stops.forEach(eachStop => {
        // //     console.log(results.rows[0].stops)
        // //     // console.log(results.rows[0].stops[eachStop])
        // //     let id = results.rows[0].stops.pop()
        // //     console.log(id)

        // // });
        // // pool.query(retrieveStops, [eachStop], (error, result) => {

        // //     if (error) {
        // //         console.log(error)
        // //         throw error
        // //     }
        // //     console.log(result.rows[0])
        // //     // stopsArray.push(result.rows[0].sname)
        // //     // console.log("name", stopsArray[stop])
        // // })
        // // results.rows[0].stops.forEach(stop => {
        // // })
        // console.log("\n RETRIEVED\n ---------\n\n", results.rows)
        // // console.log(stopsArray)

        // response.render('pages/stops/show', {
        //     stop: results.rows[0]
        // })
    })
})







module.exports = router;