import { login, allBars, create, createReservation } from "../services/bar.service";
import createHttpError from "http-errors";

export const registerBarControl = async (req, res, next) => {
  try {
    // call create bar account service.
    const account = await create(req.body);

    // response
    res.status(200).json({
      status: true,
      message: 'Bar account was created.',
      data: account
    });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const loginBarControl = async (req, res, next) => {
  try {
    const data = await login(req.body);
    res.status(200).json({
      status: true,
      message: "Bar Login Success",
      data,
    });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const getAllBarsController = async (req, res) => {
  try {
    const bars = await allBars(req.body);
    return res.status(200).json({
      status: true,
      message: "Get All Bars Success",
      data: bars
    });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
}

export const createReservationController = async (req, res) => {
  try {
    const reservation = await createReservation(req.body);
    return res.status(200).json({
      status: true,
      message: "Create Reservation Success",
      data: reservation
    });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
}