import { register, login } from "../services/auth.service";
import createHttpError from "http-errors";

export const registerControl = async (req, res, next) => {
  try {
    const user = await register(req.body);
    let response = "";
    let status = false;
    if (user === 'This email was already used') {
      response = user;
    } else if (user === 'This name was already used') {
      response = user;
    } else {
      response = user;
      status = true;
    }
    res.status(200).json({
      status: status,
      message: user === 0 ? "User created successfully" : response,
      data: user === 0 ? response : "Nothing Return.",
    });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const loginControl = async (req, res, next) => {
  try {
    const data = await login(req.body);
    res.status(200).json({
      status: true,
      message: "User created successfully",
      data,
    });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};
