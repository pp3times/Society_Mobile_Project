import express from "express";
import { loginUser } from "../controllers/AuthController.js";
import { loginMiddleware } from "../middleware/login.js";
import createHttpError from "http-errors";
const router = express.Router();

router.post("/login", loginMiddleware, loginUser);
router.use( async (req, res, next) => {
	next(createHttpError.NotFound('Route not Found'))
})
router.use( (err, req, res, next) => {
	res.status(err.status || 500).json({
			status: false,
			message: err.message
	})
})

export default router;