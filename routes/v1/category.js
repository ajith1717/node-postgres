const express = require("express");
const router = express.Router();

const fs = require('fs');

const multer = require("multer");


// Create a directory to store uploaded CSV files
const uploadDirectory = './uploads';
fs.mkdirSync(uploadDirectory, { recursive: true });

// Configure Multer to store uploaded files in the 'uploads' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        // Generate a unique filename by adding a timestamp
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.originalname}`;
        cb(null, filename);
    },
});

// Configure Multer to store uploaded files in the 'uploads' directory
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, uploadDirectory);
        cb(null, path.join(__dirname, '../../uploads'))
    },
    filename: (req, file, cb) => {
        // Generate a unique filename by adding a timestamp
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.originalname}`;
        cb(null, Date.now() + path.extname(file.originalname))
    },
});


const upload = multer({ storage: storage });
const imageUpload = multer({ storage: imageStorage })
const categoryController = require("../../controllers/category");
const { authenticateAPI } = require("../../config/passport");
const path = require("path");

// api for add category
router.post("/add", categoryController.addCategory)

// api for get all category
router.get("/", categoryController.fetchAllCategories)


// api for update category by id
router.post("/re-order", categoryController.reOrderCategory)


router.put("/image/upload", imageUpload.any(), categoryController.uploadCategoryImages)


// api for update category by id
router.post("/update", categoryController.updateCategoryId)
module.exports = router;
