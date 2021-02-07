"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = "Server sample";
const sampleController = (req, res) => {
    logging_1.default.info(NAMESPACE, "Sample server check");
    return res.status(200).json({
        message: "pong",
    });
};
exports.default = { sampleController };
//# sourceMappingURL=sampleCtrl.js.map