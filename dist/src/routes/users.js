"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const userCtrls_1 = require("../controllers/userCtrls");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
//@METHOD post
//@Register
//@api /users/register
router.post("/register", [
    express_validator_1.check("name", "Text is required").not().isEmpty(),
    express_validator_1.check("email", "Email is required").isEmail(),
    express_validator_1.check("password", "Password is required and must be 6 chars").isLength({
        min: 6,
    }),
], userCtrls_1.registerUserCTRL);
//@METHOD get
//@Get User
//@api /users/get-user
router.get("/get-user", auth_1.auth, userCtrls_1.getUsersCTRL);
//@METHOD get
//@Get user posts
//@api /users/user-posts
router.get("/user-posts", auth_1.auth, userCtrls_1.getUserPostsCTRL);
exports.default = { router };
//# sourceMappingURL=users.js.map