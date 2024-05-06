const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
const multer = require("multer");
const AppError = require("./AppError");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const createMulterUpload = (folderName) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png"],
    params: {
      folder: folderName,
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      return cb(null, true);
    }
    return cb(new AppError("Please upload image file", 400), false);
  };

  return multer({ storage, fileFilter });
};

const uploadCloudUser = createMulterUpload("user");
const uploadCloudProduct = createMulterUpload("product");

module.exports = { uploadCloudUser, uploadCloudProduct };
