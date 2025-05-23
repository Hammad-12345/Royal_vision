const express = require("express");
const dashboardrouter = express.Router();
const { createDeposit,fetchallinvestment } = require("../controller/dashboardcomtroller");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../Middleware/auth");



dashboardrouter.post("/deposit",verifyToken, createDeposit);

dashboardrouter.get("/fetchallinvestment",verifyToken,fetchallinvestment)

module.exports = dashboardrouter;
