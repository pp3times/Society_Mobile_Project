import {
  login,
  allBars,
  create,
  createReservation,
  getTableById,
  createReviewService,
  GetAllReviewService,
  updateBarStatusService,
  addTableService,
  deleteTableService,
  getAllTableService,
  getTableReservationService,
  receiveTableService,
  getWaitingOrderService
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
    console.log(reservation)
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
    const bar = await updateBarStatusService(req.params.barId, req.body.status)
    return res.status(200).json({
      status: true,
      message: 'Set Bar Status Success',
      data: bar,
    })
  } catch (e) {
    return res.status(400).json({msg: e.message})
  }
}

export const addTable = async (req, res) => {
  try {
    const response = await addTableService(req.body)
    return res.status(200).json({
      status: true,
      message: 'Add table Success',
      data: response,
    })
  } catch (e) {
    return res.status(400).json({msg: e.message})
  }
}

export const deleteTable = async (req, res) => {
  try {
    const response = await deleteTableService(req.body.tableId)
    return res.status(200).json({
      status: true,
      message: `Delete table ID ${req.body.tableId} Success`,
      data: response,
    })
  } catch (e) {
    return res.status(400).json({msg: e.message})
  }
}

export const getAllTable = async (req, res) => {
  try {
    const response = await getAllTableService(req.params.barId)
    return res.status(200).json({
      status: true,
      message: `Get All Table Success`,
      data: response,
    })
  } catch (e) {
    return res.status(400).json({msg: e.message})
  }
}

export const getTableReservation = async (req, res) => {
  try {
    const response = await getTableReservationService(
      parseInt(req.params.barId)
    )
    return res.status(200).json({
      status: true,
      message: `Get All Table Reservation Success`,
      data: response,
    })
  } catch (e) {
    return res.status(400).json({msg: e.message})
  }
}

export const reciveTable = async (req, res) => {
  try {
    if (req.body.passcode === undefined) {
      throw new Error('Missing Parameter: passcode');
    }

    const {passcode} = req.body;

    console.log(`Passcode is ${passcode}`);

    const response = await receiveTableService(passcode);

    return res.status(200).json({
      status: true,
      message: 'Revived',
      data: response
    });
  } catch(e) {
    return res.status(400).json({msg: e.message});
  }
}

export const getWaitingOrder = async (req, res) => {
  try {
    const {userId} = req.params.userId;

    const response = await getWaitingOrderService(userId);

    return res.status(200).json({
      status: true,
      message: 'Get User`s Waiting Order Success',
      data: response
    });
  } catch(e) {
    return res.status(400).json({msg: e.message});
  }
}