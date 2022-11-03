import createHttpError from "http-errors";
import { verifyAccessToken } from "../utils/jwt";

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(createHttpError.Unauthorized("Accress token is required"));
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return next(createHttpError.Unauthorized());
  }

  await verifyAccessToken(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((e) => {
      next(createHttpError.Unauthorized(e.message));
    });
};

export default auth;
