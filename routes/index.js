const express = require("express")
const router = express.Router()
const uuidv4 = require('uuid/v4')

// Connect to database
const {
    pool
} = require('../migrations/config')

// Root route
router.get('/', (request, response) => response.render('pages/index', {
    messages: {
        danger: request.flash('danger'),
        warning: request.flash('warning'),
        success: request.flash('success')
    }
}))

// Register / Sign up route
router.get('/register', (request, response) => response.render('pages/register', {
    messages: {
        danger: request.flash('danger'),
        warning: request.flash('warning'),
        success: request.flash('success')
    }
}))

// handle register / sign up logic
router.post('/register', async (request, response) => {
    const {
        first_name,
        middle_name,
        last_name,
        telephone,
        afm,
        email,
        password
    } = request.body
    // Store salted and hashed password
    // let pwd = await bcrypt.hash(request.body.password, 5)

    // Queries
    const retrieve_query = 'SELECT id FROM "users" WHERE email=$1'
    const insert_query = 'INSERT INTO "users" (id, first_name, middle_name, last_name, telephone, afm, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'

    // Check if email address is already used
    pool.query(retrieve_query, [email], (error, result) => {
        if (result.rows[0]) {
            request.flash('warning', "This email address is already registered. < a href = '/login'>Log in!</a > ");
            response.redirect('/register')
        } else {
            // Insert user into users table
            pool.query(insert_query, [uuidv4(), first_name, middle_name, last_name, telephone, afm, email, password], (error, result) => {
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
router.get('/login', (request, response) => {
    response.render('pages/login', {
        messages: {
            danger: request.flash('danger'),
            warning: request.flash('warning'),
            success: request.flash('success')
        }
    })

})

// handle log in logic
// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/account',
//     failureRedirect: '/login'
// }), (request, response) => {
//     console.log("in login post")
//     response.redirect('/')
// })
router.post('/login', (request, response) => {
    const {
        email,
        password
    } = request.body
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2'
    if (email && password) {
        pool.query(query, [email, password], (error, result) => {
            // console.log(result)
            // console.log("\nuser row[0]:", result.rows[0])
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
                // console.log("session user:",request.session.user)
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
    // console.log(request.logout)
    request.logout()
    // console.log(request.isAuthenticated())
    request.flash('success', 'Logged you out!')
    response.redirect("/")
});


// passport.use('local', new LocalStrategy({
//     passReqToCallback: true
// }, (request, email, password, done) => {
//     loginAttempt();
//     async function loginAttempt() {
//         // const {
//         //     email
//         // } = request.body

//         const query = 'SELECT id, "first_name", "middle_name", "last_name" "email", "password" FROM "users" WHERE "email"=$1'

//         pool.query(query, [email], (error, result) => {
//             if (error) return (error)
//             console.log("loginAttempt", result.rows[0])
//             if (result.rows[0] == null) {
//                 request.flash('danger', "Oops. Incorrect login details.");
//                 return done(null, false);
//             } else {
//                 bcrypt.compare(password, result.rows[0].password, (error, check) => {
//                     if (error) {
//                         console.log('Error while checking password')
//                         return done()
//                     } else if (check) {
//                         console.log(result.rows[0])
//                         return done(null, [{
//                             email: result.rows[0].email,
//                             firstName: result.rows[0].firstName
//                         }]);
//                     } else {
//                         request.flash('danger', "Oops. Incorrect login details.");
//                         return done(null, false)
//                     }
//                 })
//             }
//         })
//     }
// }))

// passport.serializeUser(function (user, done) {
//     console.log(user)
//     done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//     console.log(user)

//     done(null, user);
// });



module.exports = router