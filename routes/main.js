const express = require('express')
const main = require('../controller/main')
const router =  express.Router()
const mainController = require('../controller/main')
const upload = require('../middlewares/multer')

router.get('/', mainController.getIndex)
router.get('/admin',  mainController.adminIndex)
router.post('/createparcel', upload.single('file') ,mainController.createparcel)
router.get('/parcel/:id', mainController.getParcel)
router.get('/edit/:id', mainController.editParcel)
router.post('/editparcel/:id', mainController.savechanges)
router.post('/findparcel' , mainController.findparcel)
router.post('/getparcel', mainController.clientParcel)
router.get('/parcel/user/:id', mainController.viewparcel)

module.exports = router