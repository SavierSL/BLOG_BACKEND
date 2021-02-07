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
exports.getUserPostsCTRL = exports.getUsersCTRL = exports.registerUserCTRL = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const gravatar_1 = __importDefault(require("gravatar"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const settings_1 = require("../config/settings");
const BlogPost_1 = require("../models/BlogPost");
const registerUserCTRL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ msg: errors.array() });
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const date = req.body.date;
    try {
        let user = yield User_1.User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ msg: [{ msg: "Email already exist" }] });
        }
        //Get users gravatar
        const avatar = gravatar_1.default.url(email, {
            s: "200",
            r: "pg",
            d: "mm",
        });
        user = new User_1.User({
            name,
            email,
            password,
            avatar,
            date,
        });
        //bcrypt password
        const salt = yield bcrypt_1.default.genSalt(10);
        user.password = yield bcrypt_1.default.hash(password, salt);
        yield user.save();
        //Return the jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            },
        };
        //token
        jsonwebtoken_1.default.sign(payload, settings_1.settings.jwtSecret, { expiresIn: 400000 }, (e, token) => {
            if (e) {
                throw e;
            }
            else {
                res.json(token);
            }
        });
    }
    catch (error) {
        return res.status(500).json({ errors: error });
    }
});
exports.registerUserCTRL = registerUserCTRL;
const getUsersCTRL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user.id;
    try {
        const user = yield User_1.User.findById(userID).select("-password");
        if (!user) {
            return res.status(400).json({ msg: [{ msg: "Cannot find user" }] });
        }
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.getUsersCTRL = getUsersCTRL;
const getUserPostsCTRL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user.id;
    try {
        let userPosts = yield BlogPost_1.BlogPost.find().select("-img");
        if (userPosts.length === 0) {
            return res.status(400).json({ msg: [{ msg: "Cannot find a post" }] });
        }
        console.log(userPosts);
        const newPosts = userPosts.filter((post) => {
            const postID = post.user.toString();
            if (postID === userID)
                return post;
        });
        res.json(newPosts);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getUserPostsCTRL = getUserPostsCTRL;
//# sourceMappingURL=userCtrls.js.map