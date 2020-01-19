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
            user: request.session.currentUser
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
            user: request.session.currentUser
        })
    } else {
        request.flash('danger', 'Permission denied')
        response.redirect('/login')
    }
})

// Update - update profile
router.put('/edit', (request, response) => {
    if (request.session.loggedin) {
        const {
            firstName,
            lastName,
            telephone,
            afm,
            email,
            password
        } = request.body
        const checkPassword = 'SELECT * FROM users WHERE id = $1 AND password = $2'
        const updateData = 'UPDATE users SET firstName = $1, lastName = $2, telephone = $3, afm = $4, email = $5 WHERE id = $6'
        pool.query(checkPassword, [request.session.currentUser.id, password], (error, result) => {
            if (result.rowCount == 0) {
                request.flash('danger', 'Ο κωδικός που δώσατε είναι λάθος')
                response.redirect('/account/edit');
            } else {
                console.log('check => ', result.rows[0])
                pool.query(updateData, [firstName, lastName, telephone, afm, email, result.rows[0].id], (error, result) => {
                    if (error) {
                        console.log(error)
                        throw error
                    }
                    // request.session.currentUser.firstName = firstName
                    // request.session.currentUser.lastName = lastName
                    // request.session.currentUser.telephone = telephone
                    // request.session.currentUser.afm = afm
                    // request.session.currentUser.email = email
                    console.log('result => ',result)
                    request.flash('success', 'User updated.')
                    response.redirect('/account');
                })
            }
        })
        response.redirect('/account')
    } else {
        request.flash('danger', 'Permission denied')
        response.redirect('/login')
    }
})

// Destroy - delete user
router.delete('/', (request, response) => {
    if (request.session.loggedin) {
        const query = 'DELETE FROM users WHERE id = $1'
        pool.query(query, [request.session.currentUser.id], (error, results) => {
            if (error) {
                console.log(error)
                throw error
            }
            delete request.session.currentUser
            delete response.locals.currentUser
            request.session.loggedin = false
            request.flash('success', 'Deleted user')
            response.redirect("/")
        })
    } else {
        request.flash('danger', 'Permission denied')
        response.redirect('/login')
    }
})

module.exports = router;