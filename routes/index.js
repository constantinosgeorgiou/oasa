const express = require("express")
const router = express.Router()
const uuidv4 = require('uuid/v4')

// Connect to database
const {
    pool
} = require('../migrations/config')

// Miscellaneous routes
router.get('/history', (request, response) => response.render('pages/miscellaneous/history'))
router.get('/business', (request, response) => response.render('pages/miscellaneous/business'))
router.get('/prokirikseis', (request, response) => response.render('pages/miscellaneous/prokirikseis'))
router.get('/help', (request, response) => response.render('pages/miscellaneous/help'))
router.get('/accessibility', (request, response) => response.render('pages/miscellaneous/accessibility'))
router.get('/contact', (request, response) => response.render('pages/miscellaneous/contact'))
router.get('/ekdotiria', (request, response) => response.render('pages/miscellaneous/ekdotiria'))
router.get('/about', (request, response) => response.render('pages/miscellaneous/about'))
router.get('/telematics', (request, response) => response.render('pages/miscellaneous/telematics'))
router.get('/maps', (request, response) => response.render('pages/miscellaneous/maps'))
router.get('/nearby', (request, response) => response.render('pages/miscellaneous/nearby'))
router.get('/reducedfare', (request, response) => response.render('pages/miscellaneous/reducedfare'))
router.get('/news', (request, response) => response.render('pages/miscellaneous/news'))

// Root route
router.get('/', (request, response) => {
    if (!request.session.loggedin) {
        request.session.loggedin = false
    }
    response.render('pages/index')
})

// Register / Sign up route
router.get('/register', (request, response) => response.render('pages/register'))

// handle register / sign up logic
router.post('/register', async (request, response) => {
    const {
        firstName,
        lastName,
        telephone,
        afm,
        email,
        password
    } = request.body

    // Queries
    const retrieve_query = 'SELECT id FROM "users" WHERE email=$1'
    const insert_query = 'INSERT INTO "users" (id, firstName, lastName, telephone, afm, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7)'

    // Check if email address is already used
    pool.query(retrieve_query, [email], (error, result) => {
        if (result.rows[0]) {
            request.flash('warning', "This email address is already registered.");
            response.redirect('/register')
        } else {
            // Insert user into users table
            pool.query(insert_query, [uuidv4(), firstName, lastName, telephone, afm, email, password], (error, result) => {
                if (error) {
                    console.log(error)
                    throw error
                }
                console.log(result)
                request.flash('success', 'User created.')
                response.redirect('/login');
            })
        }
    })
})



// Log in route
router.get('/login', (request, response) => response.render('pages/login'))

// handle log in logic
router.post('/login', (request, response) => {
    const {
        email,
        password
    } = request.body

    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2'

    if (email && password) {
        pool.query(query, [email, password], (error, result) => {
            if (result.rowCount > 0) {
                request.session.loggedin = true
                let user = {
                    id: result.rows[0].id,
                    firstName: result.rows[0].firstName,
                    lastName: result.rows[0].lastName,
                    telephone: result.rows[0].telephone,
                    afm: result.rows[0].afm,
                    email: result.rows[0].email
                }
                request.session.currentUser = user
                console.log("request.session.currentUser => ", request.session.currentUser)
                response.redirect('/account')
            } else {
                // incorrect email / password
                request.flash('danger', "Oops. Incorrect login details.");
                response.redirect('/login')

            }
        })
    }
})


// Log out route
router.get("/logout", (request, response) => {
    delete request.session.currentUser
    delete response.locals.currentUser
    request.session.loggedin = false
    request.flash('success', 'Logged you out!')
    response.redirect("/")
});

module.exports = router