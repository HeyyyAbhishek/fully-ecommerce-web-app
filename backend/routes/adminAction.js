const express = require('express');
const router = express.Router();//change handler to this router
const authentication = require('../service/security/authentication');

//DB Files
const adminController = require('../controllers/adminController');
const authorisation = require('../service/security/authorisation');

//Route
router.get('/user', authentication, authorisation("admin"), (req, res) => adminController.load_platform_users(req, res))
router.delete('/user', authentication, authorisation("admin"), (req, res) => adminController.delete_user_profile(req, res))

module.exports = router;