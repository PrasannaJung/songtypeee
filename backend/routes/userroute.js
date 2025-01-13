const router= require('express').Router()
const userController = require("../controllers/usercontroller.js")
const {authGuard} = require('../middleware/authguard.js')


//register user api
router.post('/register',userController.createUser)
//login user api
router.post('/login',userController.loginUser)
//get all users api
router.get('/getUser',authGuard,userController.getUser)

 


//controllers-Routes-Index.js(yesari connect hunxa file haru)

//exporting
module.exports=router;