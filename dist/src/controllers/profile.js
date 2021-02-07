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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileCTRL = void 0;
const Profile_1 = require("../models/Profile");
const ProfileCTRL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user.id;
    const body = req.body;
    try {
        let profile = yield Profile_1.Profile.findOne({ user: userID });
        if (profile) {
            return res.status(400).json({ msg: "User already exist" });
        }
        profile = Object.assign({ user: userID }, body);
        const newProfile = new Profile_1.Profile(profile);
        yield newProfile.save();
        res.send(newProfile);
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
exports.ProfileCTRL = ProfileCTRL;
//# sourceMappingURL=profile.js.map