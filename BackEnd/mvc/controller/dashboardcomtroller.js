const Deposit = require("../model/depositmodel");

const createDeposit = async (req, res) => {
  const { investmentPlan, price, paymentMethod, depositAddress, screenshot, paymentMode } = req.body;
  const userId = req.userId;
  console.log(req.body);

  try {
    const deposit = await Deposit.create({
      userId,
      investmentPlan,
      price,
      paymentMethod,
      depositAddress,
      screenshot,
      paymentMode
    });
    res.status(201).json(deposit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchallinvestment = async (req, res) => {
  const userId = req.userId;

  try {
    const deposits = await Deposit.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(deposits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createDeposit,fetchallinvestment };
