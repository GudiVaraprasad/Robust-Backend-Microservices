const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register', captainController.register);
router.post('/login', captainController.login);
router.get('/logout', captainController.logout);
router.get('/profile', authMiddleware.captainAuth, captainController.profile);
router.patch('/online', authMiddleware.captainAuth, captainController.online);

module.exports = router;