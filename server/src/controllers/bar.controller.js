import {
  login,
  allBars,
  create,
  createReservation,
  getTableById,
  createReviewService,
  GetAllReviewService,
  updateBarStatusService
} from '../services/bar.service'
import createHttpError from 'http-errors'

export const getTableByIdControl = async (req, res, next) => {
  // console.log(req)
  try {
    const response = await getTableById(req.query.id)
    res.status(200).json({status: '200', payload: response})
  } catch (error) {
    res.status(404).json({msg: error.message})
  }
}

export const registerBarControl = async (req, res, next) => {
  try {
    // call create bar account service.
    const account = await create(req.body)

    // response
    res.status(200).json({
      status: true,
      message: 'Bar account was created.',
      data: account,
    })
  } catch (e) {
    res.status(500).json({msg: e.message})
  }
}

export const loginBarControl = async (req, res, next) => {
  try {
    const data = await login(req.body)
    res.status(200).json({
      status: true,
      message: 'Bar Login Success',
      data,
    })
  } catch (e) {
    res.status(500).json({msg: e.message})
  }
}

export const getAllBarsController = async (req, res) => {
  try {
    const bars = await allBars(req.body)
    return res.status(200).json({
      status: true,
      message: 'Get All Bars Success',
      data: bars,
    })
  } catch (e) {
    return res.status(400).json({msg: e.message})
  }
}

export const createReservationController = async (req, res) => {
  try {
    const reservation = await createReservation(req.body)
    return res.status(200).json({
      status: true,
      message: 'Create Reservation Success',
      data: reservation,
    })
  } catch (e) {
    return res.status(400).json({msg: e.message})
  }
}

export const createReview = async (req, res) => {
  try {
    const review = await createReviewService(req.body)
    return res.status(200).json({
      status: true,
      message: 'Create Review Success',
      data: review,
    })
  } catch (e) {
    return res.status(400).json({msg: e.message})
  }
}

export const allReview = async (req, res) => {
  try {
    const reviews = await GetAllReviewService(req.params.barId)
    return res.status(200).json({
      status: true,
      message: 'Get All Reviews Success',
      data: reviews,
    })
  } catch (e) {
    return res.status(400).json({msg: e.message})
  }
}

export const updateBarStatus = async (req, res) => {
  try {
    const bar = await updateBarStatusService(req.params.barId, req.body.status);
    return res.status(200).json({
      status: true,
      message: 'Set Bar Status Success',
      data: bar,
    })
  } catch (e) {
    return res.status(400).json({msg: e.message})
  }
}