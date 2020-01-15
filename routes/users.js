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
    
})

module.exports = router;