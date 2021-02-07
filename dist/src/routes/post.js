"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const express_validator_1 = require("express-validator");
const postCtrl_1 = require("../controllers/postCtrl");
const router = express_1.default.Router();
//@METHOD post
//@post a blogpost
//@api /post/blog-post
router.post("/blog-post", [
    auth_1.auth,
    express_validator_1.check("title", "Title is required").not().isEmpty(),
    express_validator_1.check("blogContent", "Blog Content is required").not().isEmpty(),
    postCtrl_1.BlogPostCTRL,
]);
//@METHOD GET
//@get all blogpost
//@api /post/blog-posts
router.get("/blog-posts", postCtrl_1.GetAllPostCTRL);
router.get("/blog-posts/:post_id", postCtrl_1.GetPostUser);
//@METHOD patch
//@edit a blogpost
//@api /post/blog-post
router.patch("/blog-post/edit-post/:post_id", [
    auth_1.auth,
    express_validator_1.check("title", "Title is required").not().isEmpty(),
    express_validator_1.check("blogContent", "Blog Content is required").not().isEmpty(),
    postCtrl_1.BlogPostEditPostCTRL,
]);
//@METHOD post
//@Delete Post
//@api /post/blog-post/:post_id
router.delete("/blog-post/:post_id", auth_1.auth, postCtrl_1.BlogPostDeleteCTRL);
//@METHOD post
//@Like Post
//@api
router.patch("/blog-post/:post_id", auth_1.auth, postCtrl_1.BlogPostLikeCTRL);
//@METHOD post
//@Comment in Post
//@api /post/blog-post/comment/:post_id
router.post("/blog-post/comment/:post_id", [auth_1.auth, express_validator_1.check("comment", "Comment should not be empty").not().isEmpty()], postCtrl_1.BlogPostCommentCTRL);
//@METHOD delete
//@Delete a comment in Post
//@api /post/blog-post/comment/:post_id/:comment_id
router.delete("/blog-post/comment/:post_id/:comment_id", auth_1.auth, postCtrl_1.BlogPostDeleteCommentCTRL);
exports.default = { router };
//# sourceMappingURL=post.js.map