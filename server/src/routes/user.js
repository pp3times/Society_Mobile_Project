import express from "express";
import { getUsersControl, getUserReservation } from "../controllers/user.controller";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/get", getUsersControl);
router.get("/reservation/:userId", getUserReservation);
// router.get("/get", auth, getUsersControl);

export default router;
