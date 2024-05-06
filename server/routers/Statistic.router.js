const express = require("express");
const AuthController = require("../controllers/Auth.controller");
const StatisticController = require("../controllers/Statistics.controller");
const StatisticRouter = express.Router();

StatisticRouter.use(AuthController.protect);
StatisticRouter.use(AuthController.restrictTo("admin"));
StatisticRouter.get("/total-orders", StatisticController.getTotalOrders);
StatisticRouter.get("/total-revenue", StatisticController.getTotalRevenue);
StatisticRouter.get("/monthly-revenue", StatisticController.getMonthlyRevenue);
StatisticRouter.get("/top-best-selling", StatisticController.getTopBestSelling);
module.exports = StatisticRouter;
