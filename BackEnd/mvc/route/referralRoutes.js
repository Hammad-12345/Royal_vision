const express = require('express');
const router = express.Router();
const { getReferralData, processReferral, getAllReferrals } = require('../controller/referralController');
const { verifyToken } = require('../Middleware/auth');

// Get user's referral data
router.get('/referral-data', verifyToken, getReferralData);

// Process a new referral
router.post('/process-referral', verifyToken, processReferral);

// Get all referrals (admin only)
// router.get('/referrals', verifyToken, getAllReferrals);

module.exports = router; 