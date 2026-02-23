const express=require('express')
const authController=require('../controllers/auth.controller')
const authUserMiddleware=require('../middleware/authUser.middleware')

const router=express.Router()

router.post('/register',authController.registerUser)
router.post('/login',authController.loginUser)
router.get('/usersList',authUserMiddleware.authUser,authController.getAllUsers)
router.post('/logout',authUserMiddleware.authUser,authController.logout)
module.exports=router