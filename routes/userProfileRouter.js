const router = require ('express').Router()
const userProfileController = require('../controllers/userProfileController')


router.post('/register',userProfileController.register)
router.get('/login/:email/:password',userProfileController.login)
router.get('/get/:email',userProfileController.get)
router.post('/put/:email',userProfileController.put)
router.post('/forgotpassword',userProfileController.forgotPassword)
router.post('/resetpassword',userProfileController.resetpassword)
module.exports = router;