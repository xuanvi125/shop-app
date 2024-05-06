const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User.model");
const AppError = require("../utils/AppError");
const sendMail = require("../utils/sendMail");
const { CLIENT_SERVER_URL } = require("../config/app.config.json");
const catchAsync = require("../utils/catchAsync");
function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
}
function resAndSignToken(user, statusCode, res) {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 60 * 24 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
}

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    const newUser = await User.create(req.body);
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 60 * 24 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("jwt", token, cookieOptions);
    newUser.password = undefined;
    resAndSignToken(newUser, 201, res);
    return;
  }
  return next(new AppError("This email has been already signed up", 400));
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please gimme ur email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.isCorrect(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }
  user.password = undefined;
  if (user.isActive === false) {
    return next(new AppError("this account has been deactivated", 401));
  }
  resAndSignToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token) {
    return next(new AppError("Please login to perform this action", 401));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decode.id);
  if (!user) {
    return next(new AppError("this token no belong to any user", 401));
  }
  if (user.isChangePassAfter(decode.iat)) {
    return next(
      new AppError("TOKEN INVALID. the password was already changed after", 401)
    );
  }
  if (user.isActive === false) {
    return next(new AppError("this account has been deactivated", 401));
  }
  req.user = user;
  next();
});

exports.restrictTo = function (...roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you dont have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("this email not belong to any user", 400));
  }

  //generate token

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${CLIENT_SERVER_URL}reset-password?token=${resetToken}`;
  const message = `You forgot pass ? Click this link to reset ${resetUrl}`;
  try {
    await sendMail({
      email: user.email,
      message,
      subject: "Reset password valid in 10 minutes",
    });
    res.status(200).json({
      status: "success",
      message: "Token has been sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    user.save({ validateBeforeSave: false });
    return next(new AppError("cannot send email", 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("Invalid token or token expired", 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpire = undefined;
  await user.save();
  resAndSignToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.isCorrect(req.body.currentPassword, user.password))) {
    return next(new AppError("current password is not correct", 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();
  resAndSignToken(user, 200, res);
});

exports.logout = (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 4000),
    httpOnly: true,
  };
  res.cookie("jwt", "logout", cookieOptions);
  res.status(200).json({
    status: "success",
    message: "logout successfully",
  });
};

exports.loginFail = (req, res, next) => {
  const errorMessage = "login fail";
  res.redirect(`${CLIENT_SERVER_URL}login?error=${errorMessage}`);
};

exports.loginSuccess = (req, res, next) => {
  if (!req.user.isActive) {
    res.redirect(
      `${CLIENT_SERVER_URL}login?error=${"this account has been deactivated"}`
    );
    return;
  }
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  res.redirect(`${CLIENT_SERVER_URL}login?token=${token}`);
};

exports.filterByUser = (req, res, next) => {
  if (req.user.role === "admin") return next();
  req.query.user = req.user._id;
  next();
};
