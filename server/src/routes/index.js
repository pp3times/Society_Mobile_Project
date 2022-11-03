import auth from "./auth";
import user from "./user";
import express from "express";
import createHttpError from "http-errors";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/auth", auth);
router.use("/user", user);

router.use(async (req, res, next) => {
  next(createHttpError.NotFound("Route not Found"));
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
  });
});

export default router;
