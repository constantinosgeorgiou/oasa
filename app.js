const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')
const {
    pool
} = require('./migrations/config')
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
// app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use("/", indexRoutes)
// app.use("/users", userRoutes)
// app.use("/users/:id/orders", orderRoutes)
// app.use("/route", routeRoutes)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))