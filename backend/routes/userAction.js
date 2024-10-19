const express = require('express');
const router = express.Router();//change handler to this router
const authentication = require('../service/security/authentication');
const userController = require("../controllers/userController")

//DB Files
const authorisation = require('../service/security/authorisation');

//Route
router.post('/login', (req, res) => userController.login(req, res))
router.post('/logout', (req, res) => userController.logout(req, res))
router.post('/signup', (req, res) => userController.register(req, res))

router.get('/verifyLogin', (req, res) => userController.verifyLogin(req, res))
router.get("/getDetails" , authentication, authorisation("user"),(req,res) => userController.getDetails(req,res))
router.get('/user', authentication, authorisation("user"), (req, res) => userController.load_user_profile(req, res))
router.put('/user', authentication, authorisation("user"), (req, res) => userController.update_user_profile(req, res))
router.get('/user/userList',authentication,authorisation("user"), (req, res) => userController.all_user_profile(req, res))
router.delete('/user/id/:user_id',authentication,authorisation("user"), (req, res) => userController.delete_user_profile(req, res))

module.exports = router;