const express = require('express')
const router =  express.Router()
const mainController = require('../controller/main')
const upload = require('../middlewares/multer')
const authController = require('../controller/auth')
const { ensureAuth} = require('../middlewares/auth')


router.get('/', mainController.getIndex)
router.get('/admin', mainController.adminIndex)
router.get('/admin/dashboard', ensureAuth, mainController.getdashboard)
router.post('/createparcel', ensureAuth, upload.single('file'), mainController.createparcel)
router.get('/parcel/:id', ensureAuth, mainController.getParcel)
router.get('/edit/:id', ensureAuth, mainController.editParcel)
router.post('/editparcel/:id',ensureAuth,  mainController.savechanges)
router.post('/findparcel' , ensureAuth, mainController.findparcel)
router.post('/getparcel',  mainController.clientParcel)
router.get('/parcel/user/:id', mainController.viewparcel)
router.get('/admin/vieworders', ensureAuth, mainController.getall)
router.delete('/delete/:id', ensureAuth, mainController.deleteParcel)




router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router