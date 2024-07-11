const express = require('express');
const imageController = require('../controllers/image.controller');
const imageUploader = require('../_helpers/image-uploader');
const checkAuth = require('../_middleware/check-auth');
const authorize = require('_helpers/authorize')

const router = express.Router();

router.post('/upload', authorize(), imageUploader.upload.single('image'),imageController.upload);

const multer = require("multer")


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./controllers/uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const storagefacture = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./original_images/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
const uploadStorageFacture = multer({ storage: storagefacture })
router.post("/UploadFactureOCR", uploadStorageFacture.single("file"), (req, res) => {
    console.log(req.file)
    res.send({
        mesaage: "FACTURE upload successfully",
        file:req.file,
        filename: req.file.filename
    });
    
  })
const uploadStorage = multer({ storage: storage })
router.post("/uploadPDF", uploadStorage.single("file"), (req, res) => {
    console.log(req.file)
    res.send({
        mesaage: "FACTURE upload successfully",
        file:req.file,
        filename: req.file.filename
    });
    
  })



module.exports = router;