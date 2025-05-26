const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Investment = require('../models/Investment');
const Profit = require('../models/Profit');
const Withdrawal = require('../models/Withdrawal');

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalInvestments = await Investment.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalProfits = await Profit.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const pendingWithdrawals = await Withdrawal.countDocuments({ status: 'pending' });

    res.json({
      totalUsers,
      totalInvestments: totalInvestments[0]?.total || 0,
      totalProfits: totalProfits[0]?.total || 0,
      pendingWithdrawals
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all investments
router.get('/investments', async (req, res) => {
  try {
    const investments = await Investment.find()
      .populate('userId', 'username email')
      .populate('planId', 'name returnRate');
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Process daily profits
router.post('/process-profits', async (req, res) => {
  try {
    const investments = await Investment.find({ status: 'active' })
      .populate('planId');

    for (const investment of investments) {
      const dailyProfit = (investment.amount * investment.planId.returnRate) / 100;
      
      await Profit.create({
        userId: investment.userId,
        investmentId: investment._id,
        amount: dailyProfit,
        date: new Date()
      });

      // Update user's wallet
      await User.findByIdAndUpdate(investment.userId, {
        $inc: { walletBalance: dailyProfit }
      });
    }

    res.json({ message: 'Daily profits processed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all withdrawals
router.get('/withdrawals', async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find()
      .populate('userId', 'username email');
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update withdrawal status
router.put('/withdrawals/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const withdrawal = await Withdrawal.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(withdrawal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 