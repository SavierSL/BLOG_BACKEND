"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = require("../config/settings");
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    try {
        const user = yield User_1.User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ msg: [{ msg: "Invalid Email" }] });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: [{ msg: "Pass is wrong" }] });
        }
        //return jwt token
        const payload = {
            user: {
                id: user.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, settings_1.settings.jwtSecret, { expiresIn: 40000 }, (e, token) => {
            if (e) {
                throw e;
            }
            else {
                res.cookie("token", token);
                res.json({ token: token });
            }
        });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.logInUser = logInUser;
//# sourceMappingURL=authCtrl.js.map