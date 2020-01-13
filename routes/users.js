const express = require("express")
const router = express.Router()

// Connect to database
const {
    pool
} = require('../migrations/config')


module.exports = router;