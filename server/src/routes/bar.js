import express from 'express'
import * as controller from '../controllers/bar.controller'

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

export default router
