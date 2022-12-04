import express from "express";
import { getUsersControl, getUserReservation, updateUser, getUser } from "../controllers/user.controller";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/get", getUsersControl);
router.get("/reservation/:userId", getUserReservation);
router.patch("/:userId", updateUser);
router.get("/:userId", getUser);
// router.get("/get", auth, getUsersControl);

export default router;
