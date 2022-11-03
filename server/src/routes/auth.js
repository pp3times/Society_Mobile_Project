// const router = require("express").Router();
import express from "express";
import {
  registerControl,
  loginControl,
} from "../controllers/auth.controller";
import auth from "../middlewares/auth";
const router = express.Router();

// register
router.post("/", registerControl);

// login
router.post("/login", loginControl);

export default router;
