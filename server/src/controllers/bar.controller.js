import { register, login } from "../services/bar.service";
import createHttpError from "http-errors";

export const registerBarControl = async (req, res, next) => {
  try {
    const user = await register(req.body);
    let response = "";
    let status = false;
    if (user === 1) {
      response = "Email and Name is already used.";
    } else if (user === 2) {
      response = "This email is already used.";
    } else if (user === 3) {
      response = "This name is already used.";
    } else {
      response = user;
      status = true;
    }
    res.status(200).json({
      status: status,
      message: user === 0 ? "Bar Create successfully" : response,
      data: user === 0 ? response : "Nothing Return.",
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
