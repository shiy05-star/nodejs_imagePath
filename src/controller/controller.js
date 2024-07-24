const model = require('../model/model.js');
const CryptoJS = require("crypto-js");

const crypto = require('crypto');
const bcrypt = require('bcrypt');

const insertForm = async (req, res) => {
  function hashPassword(p_ap_password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(p_ap_password, salt, 1000, 64, 'sha512').toString('hex');
    return `${hash}:${salt}`;
  }

  try {
    const { p_ap_userName, p_ap_email, p_ap_password } = req.body;
    const hashedPassword = hashPassword(p_ap_password);
    console.log(hashedPassword, "hashedPassword12");
    const imagePaths = req.files[0].path; 
    const results = await model.insertForm(p_ap_userName, p_ap_email, hashedPassword, imagePaths);
    console.log(results, "result");

    return res.status(200).json({
      success: true,
      error: false,
      message: "Details added successfully",
    });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error" +err.sqlMessage,
    });
  }
};

// ----------------------------------
// const key = 'XkhZG4fW2t2W'; 
// const iv = CryptoJS.enc.Utf8.parse("XkhZG4fW2t2W");

// const insertForm = async (req, res) => {
//   try {
//     const { p_ap_userName, p_ap_email, p_ap_password } = req.body;
//     const imagePaths = req.files[0].path; 

//     console.log(req.body);
//     console.log(req.files[0].path);

//     // Encrypt the password
//     const keyutf = CryptoJS.enc.Utf8.parse(key);
//     const encrypted = CryptoJS.AES.encrypt(p_ap_password, keyutf, { iv: iv });
//     const encryptedStr = encrypted.toString();

//     console.log("Encrypted Password:", encryptedStr);

//     const results = await model.insertForm(p_ap_userName, p_ap_email, encryptedStr, imagePaths);
//     console.log(results,"result");

//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: "Details added successfully",
//     });
//   } catch (err) {
//     console.error("Error executing query:", err);
//     res.status(500).json({
//       success: false,
//       error: true,
//       message: "Internal server error" +err.sqlMessage,
//     });
//   }
// };
// ==========================================================================


const getLoginDetails = async (req, res) => {
  try {
    const { p_ap_email, p_ap_password } = req.body;

    if (!p_ap_email || !p_ap_password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    // const hashedPassword = await bcrypt.hash(p_ap_password, 10);
    const results = await model.getLoginDetails(p_ap_email, p_ap_password);
    //  console.log(results,"123");
    const protocol = "https";
    const basePath = `${protocol}://${req.get("host")}/upload/images/`;
     console.log(basePath);
    for (let i = 0; i < results.length; i++) {
      const imageFileNames = results[i].ap_image_path;

      const imagePaths = imageFileNames
        ? imageFileNames.split(", ").map((fileName) => `${basePath}/${fileName.trim()}`)
        : [];

      results[i].ap_image_path = imagePaths;
      console.log(imageFileNames);
    }

    console.log("Processed results:", results);

    res.status(200).json({
      success: true,
      error: false,
      message: "Records fetched successfully.",
      data: results,
    });

  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error: " + err.message,
    });
  }
};

// --------------------------




module.exports = {
  insertForm,getLoginDetails
};