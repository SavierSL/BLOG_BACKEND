"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sampleCtrl_1 = __importDefault(require("../controllers/sampleCtrl"));
const router = express_1.default();
router.get("/ping", sampleCtrl_1.default.sampleController);
exports.default = { router };
//# sourceMappingURL=sample.js.map