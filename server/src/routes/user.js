import express from "express";
import { getUsersControl } from "../controllers/user.controller";

const router = express.Router();

router.get("/get", getUsersControl);

export default router;
