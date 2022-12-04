import express from 'express'
import * as controller from '../controllers/bar.controller'
const multer = require('multer')
var path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

const router = express.Router()

router.get('/all', controller.getAllBarsController)
router.post('/create', controller.registerBarControl)
router.post('/reserve', controller.createReservationController)
router.get('/table', controller.getTableByIdControl)
router.post('/review', controller.createReview)
router.get('/review/:barId', controller.allReview)
router.post('/status/:barId', controller.updateBarStatus)
router.post('/table', controller.addTable)
router.delete('/table', controller.deleteTable)
router.get('/table/:barId', controller.getAllTable)
router.get('/reservation/:barId', controller.getTableReservation)
router.post('/reservation/receive', controller.reciveTable)
router.get('/reservation/waiting/:userId', controller.getWaitingOrder)
router.post('/image', upload.single('image'), controller.addImage)

export default router
