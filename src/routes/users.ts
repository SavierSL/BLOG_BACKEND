import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import {
  getUserPostsCTRL,
  getUsersCTRL,
  registerUserCTRL,
} from "../controllers/userCtrls";
import { auth } from "../middleware/auth";

const router = express.Router();

//@METHOD post
//@Register
//@api /users/register
router.post(
  "/register",
  [
    check("name", "Text is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required and must be 6 chars").isLength({
      min: 6,
    }),
  ],
  registerUserCTRL
);

//@METHOD get
//@Get User
//@api /users/get-user
router.get("/get-user", auth, getUsersCTRL);
//@METHOD get
//@Get user posts
//@api /users/user-posts
router.get("/user-posts", auth, getUserPostsCTRL);

export default { router };
