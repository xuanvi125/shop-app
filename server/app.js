const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const globalErrorHandler = require("./controllers/Error.controller.js");
const UserRouter = require("./routers/User.router.js");
const CategoryRouter = require("./routers/Category.router.js");
const BookRouter = require("./routers/Book.router.js");
const AccountRouter = require("./routers/Account.router.js");
const OrderRouter = require("./routers/Order.router.js");
const StatisticRouter = require("./routers/Statistic.router.js");
const initPassport = require("./utils/initPassport");
const AuthRouter = require("./routers/Auth.router.js");
const ReviewRouter = require("./routers/Review.router.js");

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  })
);

initPassport(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/categories", CategoryRouter);
app.use("/api/v1/books", BookRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/accounts", AccountRouter);
app.use("/api/v1/orders", OrderRouter);
app.use("/api/v1/reviews", ReviewRouter);
app.use("/api/v1/statistics", StatisticRouter);

app.use(globalErrorHandler);
module.exports = app;
