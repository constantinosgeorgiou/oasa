const express = require("express")
const router = express.Router()

// Root route
router.get('/', (request, response) => response.render('pages/index'))

// Register / Sign up route
router.get('/register', (request, response) => response.render('pages/register'))

// Log in route
router.get('/login', (request, response) => response.render('pages/login'))


module.exports = router;