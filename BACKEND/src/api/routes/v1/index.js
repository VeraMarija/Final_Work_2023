const express = require('express');
const userRoutes = require('./user');
const authRoutes = require('./auth');
const exerciseRoutes = require('./exercise');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/exercise', exerciseRoutes);

module.exports = router;
