import express from "express";
import {
  registerControl,
  loginControl,
} from "../controllers/auth.controller";
import {
	registerBarControl,
	loginBarControl
} from "../controllers/bar.controller"

import auth from "../middlewares/auth";
const router = express.Router();

// register
router.post("/register", registerControl);

// login
router.post("/login", loginControl);

// Bar Register
router.post("/barreg", registerBarControl);

// Bar Login
router.post("/barlog", loginBarControl)

export default router;
