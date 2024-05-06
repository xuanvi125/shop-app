const AppError = require("../utils/AppError");

const responseError = (err, res) => {
  console.log(err);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};

function handleCastError(err) {
  return new AppError(`invalid ${err.path} value ${err.value} `, 404);
}
function handleDuplicate(err) {
  const regex = /[^{}]+(?=})/g;
  return new AppError(`${err.message.match(regex)[0]} already exists`, 400);
}

function handleValidationError(err) {
  const key = Object.values(err.errors).map((value) => value.message);
  return new AppError(`Validation fail ! ${key.join(". ")}`, 400);
}

function handleJWTError() {
  return new AppError("invalid token, please login", 400);
}
function handleJWTExpireError() {
  return new AppError("token has been exprired", 400);
}
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.name === "CastError") err = handleCastError(err);
  if (err.code === 11000) err = handleDuplicate(err);
  if (err.name === "ValidationError") err = handleValidationError(err);
  if (err.name === "JsonWebTokenError") err = handleJWTError();
  if (err.name === "TokenExpiredError") err = handleJWTExpireError();
  responseError(err, res);
};
