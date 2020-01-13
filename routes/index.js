const express = require("express")
const router = express.Router()

// Root route
router.get('/', (request, response) => response.render('pages/index'))

module.exports = router;