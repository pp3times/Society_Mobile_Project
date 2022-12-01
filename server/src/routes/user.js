import express from "express";
import { getUsersControl } from "../controllers/user.controller";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/get", getUsersControl);
// router.get("/get", auth, getUsersControl);

export default router;
