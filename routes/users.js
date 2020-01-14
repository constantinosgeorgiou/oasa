const express = require("express")
const router = express.Router()

// Connect to database
const {
    pool
} = require('../migrations/config')

// Root route
router.get('/', (request, response) => {
    if (request.session.loggedin) {
        response.render('pages/users/index', {
            user: request.session.user,
            messages: {
                danger: request.flash('danger'),
                warning: request.flash('warning'),
                success: request.flash('success')
            }
        })
    } else {
        response.redirect('/login')
    }
})

module.exports = router;