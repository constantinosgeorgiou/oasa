const express = require('express')
const session = require('express-session')
const bodyParser = require("body-parser")
const path = require('path')
const dotenv = require('dotenv')
const flash = require('connect-flash')
const PORT = process.env.PORT || 5000
const app = express()

// Require routes
const indexRoutes = require("./routes/index")
const userRoutes = require("./routes/users")
const orderRoutes = require("./routes/orders")
const routeRoutes = require("./routes/routes")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(flash());
app.use(session({
    secret: 'Santra! Pou en to koustoumi sou?',
    resave: false,
    saveUninitialized: false
}))

app.use((request, response, next) => {
    response.locals.warning = request.flash("warning")
    response.locals.danger = request.flash("danger")
    response.locals.success = request.flash("success")
    next();
});

app.use("/", indexRoutes)
app.use("/account", userRoutes)
// app.use("/users/:id/orders", orderRoutes)
app.use("/routes", routeRoutes)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))