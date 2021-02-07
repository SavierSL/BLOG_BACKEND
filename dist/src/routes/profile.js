"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const profile_1 = require("../controllers/profile");
const router = express_1.default.Router();
//@METHOD post
//@Make a Profile
//@api /profile/edit-profile
router.post("/edit-profile", auth_1.auth, profile_1.ProfileCTRL);
exports.default = { router };
//# sourceMappingURL=profile.js.map