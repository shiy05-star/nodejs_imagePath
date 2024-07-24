const express = require("express");
const router = express.Router();
const Controller = require('../controller/controller');

const path = require("path");
const multer = require("multer");
 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/images');
  },
  filename: (req, file, cb) => {
   cb(null, file.originalname);
  }
});
 
 
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
}).array('imagePaths', 10);
 
const uploadStorage = upload;

router.post('/signup', uploadStorage, Controller.insertForm);
router.get('/login', Controller.getLoginDetails);



// ==================================================

/**
 * @swagger
 *  api/v1/signup:
 *   post:
 *     tags:
 *       - UserController
 *     summary: Endpoint to register a new user with profile image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               p_ap_userName:
 *                 type: string
 *               p_ap_email:
 *                 type: string
 *               p_ap_password:
 *                 type: string
 *               imagePaths:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Data Inserted Successfully
 *       400:
 *         description: Bad request - Missing or invalid parameters. Check the request body.
 */



/**
 * @swagger
 *  api/v1/login:
 *   get:
 *     tags:
 *       - UserController
 *     summary: Endpoint to login a new user with profile image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               p_ap_email:
 *                 type: string
 *               p_ap_password:
 *                 type: string
 *     responses:
 *       200:Records fetched successfully
 *       400:
 *         description: Bad request - Missing or invalid parameters. Check the request body.
 */


module.exports = router;
