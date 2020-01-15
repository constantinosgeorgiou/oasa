const express = require("express")
const router = express.Router()

// Connect to database
const {
    pool
} = require('../migrations/config')

// Root route - show profile
router.get('/', (request, response) => {
    if (request.session.loggedin) {
        response.render('pages/users/index', {
            user: request.session.user
        })
    } else {
        request.flash('warning', 'You need to be logged in')
        response.redirect('/login')
    }
})

// Edit route - edit profile
router.get('/edit', (request, response) => {
    if (request.session.loggedin) {
        response.render('pages/users/edit', {
            user: request.session.user
        })
    } else {
        request.flash('warning', 'You need to be logged in')
        response.redirect('/login')
    }
})

// Update - update profile
router.put('/edit', (request, response) => {
    const {
        email,
        password
    } = request.body
    const query = 'UPDATE users SET email = $1, password = $2 WHERE id = $3'

    pool.query(query, [email, password, request.session.user.id], (error, result) => {
        if (error) {
            console.log(error)
            throw error
        }
        request.session.user.email = email
        console.log(result)
        request.flash('success', 'User updated.')
        response.redirect('/account');
    })
})

module.exports = router;