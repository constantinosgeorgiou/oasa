const express = require("express")
const router = express.Router()
const uuidv4 = require('uuid/v4')

// Connect to database
const {
    pool
} = require('../migrations/config')

router.get('/help', (request, response) => response.render('pages/help'))
router.get('/accessibility', (request, response) => response.render('pages/accessibility'))
router.get('/contact', (request, response) => response.render('pages/contact'))
router.get('/ekdotiria', (request, response) => response.render('pages/ekdotiria'))
router.get('/ticket', (request, response) => response.render('pages/ticket'))
router.get('/about', (request, response) => response.render('pages/about'))
router.get('/telematics', (request, response) => response.render('pages/telematics'))
router.get('/maps', (request, response) => response.render('pages/maps'))
router.get('/nearby', (request, response) => response.render('pages/nearby'))
router.get('/meiomena', (request, response) => response.render('pages/meiomena'))


// Root route
router.get('/', (request, response) => response.render('pages/index'))

// Register / Sign up route
router.get('/register', (request, response) => response.render('pages/register'))

// handle register / sign up logic
router.post('/register', async (request, response) => {
    const {
        first_name,
        last_name,
        telephone,
        afm,
        email,
        password
    } = request.body

    // Queries
    const retrieve_query = 'SELECT id FROM "users" WHERE email=$1'
    const insert_query = 'INSERT INTO "users" (id, first_name, last_name, telephone, afm, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7)'

    // Check if email address is already used
    pool.query(retrieve_query, [email], (error, result) => {
        if (result.rows[0]) {
            request.flash('warning', "This email address is already registered.");
            response.redirect('/register')
        } else {
            // Insert user into users table
            pool.query(insert_query, [uuidv4(), first_name, last_name, telephone, afm, email, password], (error, result) => {
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
                    first_name: result.rows[0].first_name,
                    last_name: result.rows[0].last_name,
                    telephone: result.rows[0].telephone,
                    afm: result.rows[0].afm,
                    email: result.rows[0].email
                }
                request.session.user = user
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
    request.session.user = {}
    request.session.loggedin = false
    request.flash('success', 'Logged you out!')
    response.redirect("/")
});

module.exports = router