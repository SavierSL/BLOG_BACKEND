"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongodb_1 = require("mongodb");
const BlogPostProfileSchema = new mongoose_1.default.Schema({
    user: {
        type: mongodb_1.ObjectId,
        ref: "user",
    },
    hobbies: {
        type: Array,
    },
    favourites: {
        type: Array,
    },
    featuredBlogs: {
        type: Array,
    },
    followers: {
        type: Array,
    },
    followeing: {
        type: Array,
    },
    blogs: {
        type: Array,
    },
});
exports.Profile = mongoose_1.model("profile", BlogPostProfileSchema);
//# sourceMappingURL=Profile.js.map