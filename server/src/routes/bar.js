import express from 'express'
import * as controller from '../controllers/bar.controller'

const router = express.Router()

router.get('/all', controller.getAllBarsController)
router.post('/create', controller.registerBarControl)
router.post('/reserve', controller.createReservationController)
router.get('/table', controller.getTableByIdControl)

export default router
