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
exports.BlogPostDeleteCommentCTRL = exports.BlogPostCommentCTRL = exports.BlogPostLikeCTRL = exports.BlogPostDeleteCTRL = exports.BlogPostEditPostCTRL = exports.GetPostUser = exports.GetAllPostCTRL = exports.BlogPostCTRL = void 0;
const BlogPost_1 = require("../models/BlogPost");
const User_1 = require("../models/User");
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "src/public/uploads/images");
//   },
//   filename: (req, file, callback) => {
//     callback(null, Date.now() + file.originalname);
//   },
// });
// export const upload = multer({
//   storage: storage,
//   limits: {
//     fieldSize: 1024 * 1024 * 3,
//   },
// });
// function saveCover(post: postType, imgEncoded: any) {
//   if (imgEncoded === null) return;
//   const img = JSON.parse(imgEncoded);
//   console.log(img);
//   if (img != null && imageMimeTypes.includes(img.type)) {
//     post.img = Buffer.from(img, "base64");
//     post.imgType = img.type;
//   }
// }
//POST A BLOGPOST
const BlogPostCTRL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
    }
    const title = req.body.title;
    const blogContent = req.body.blogContent;
    const userID = req.user.id;
    const img = req.body.img;
    var buf = Buffer.from(img, "base64"); // Ta-da
    console.log(buf);
    try {
        const user = yield User_1.User.findById(userID).select("-password");
        console.log(userID);
        if (!user) {
            return res.status(400).json({ msg: [{ msg: "Cannot find user" }] });
        }
        const post = Object.assign({ user: user, name: user.name, title: title, blogContent: blogContent, img: buf }, req.body);
        // saveCover(post, img);
        const newPost = new BlogPost_1.BlogPost(post);
        newPost.save();
        res.json(newPost);
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.BlogPostCTRL = BlogPostCTRL;
//GET ALL POST
const GetAllPostCTRL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield BlogPost_1.BlogPost.find()
            .select("-img")
            .populate("user", ["name", "avatar"]);
        res.json(posts);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.GetAllPostCTRL = GetAllPostCTRL;
const GetPostUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postID = req.params.post_id;
    try {
        const user = yield BlogPost_1.BlogPost.findById(postID).select("-img");
        if (!user) {
            return res.status(400).json({ msg: [{ msg: "Cannot find user post" }] });
        }
        res.json(user);
    }
    catch (error) {
        return res.status(400).json({ msg: [{ msg: error }] });
    }
});
exports.GetPostUser = GetPostUser;
//EDIT POST
const BlogPostEditPostCTRL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userID = req.user.id;
    const postID = req.params.post_id;
    try {
        const updatedPost = req.body;
        const post = yield BlogPost_1.BlogPost.findOneAndUpdate({
            user: userID,
            _id: postID,
        }, { $set: updatedPost }, { new: true });
        if (!post) {
            return res.status(400).json({ msg: "Can't find post" });
        }
        yield post.save();
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
exports.BlogPostEditPostCTRL = BlogPostEditPostCTRL;
//DELETE POST
const BlogPostDeleteCTRL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogPostID = req.params.post_id;
    try {
        const postToDelete = yield BlogPost_1.BlogPost.findByIdAndDelete(blogPostID);
        if (!postToDelete) {
            return res.status(400).json({ msg: "There is no post to delete" });
        }
        res.json({ msg: "Deleted", deleted: postToDelete });
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
exports.BlogPostDeleteCTRL = BlogPostDeleteCTRL;
//LIKE
const BlogPostLikeCTRL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blogPostID = req.params.post_id;
    const userID = req.user.id;
    try {
        let post = yield BlogPost_1.BlogPost.findOne({ _id: blogPostID });
        const user = yield User_1.User.findOne({ _id: userID }).select("-password");
        if (!post) {
            return res.status(400).json({ msg: "Invalid psot ID" });
        }
        let newLikes = [];
        const isLiked = post.likes.filter((like) => {
            const likeID = like._id.toString();
            return likeID === userID;
        });
        if ((isLiked === null || isLiked === void 0 ? void 0 : isLiked.length) !== 0) {
            newLikes = post.likes.filter((like) => {
                const likeID = like._id.toString();
                return likeID !== userID;
            });
            post.likes = newLikes;
            yield post.save();
            return res.json(post);
        }
        (_a = post.likes) === null || _a === void 0 ? void 0 : _a.push(user);
        yield post.save();
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
exports.BlogPostLikeCTRL = BlogPostLikeCTRL;
//COMMENT IN POST
const BlogPostCommentCTRL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
    }
    const postID = req.params.post_id;
    const userID = req.user.id;
    try {
        let post = yield BlogPost_1.BlogPost.findByIdAndUpdate(postID);
        const user = yield User_1.User.findOne({ _id: userID }).select("-password");
        if (!post) {
            return res.status(400).json({ msg: [{ msg: "Can't find post" }] });
        }
        const newComment = Object.assign({ id: new mongodb_1.ObjectID(), name: user.name, avatar: user.avatar, user: userID, date: new Date().toISOString(), likes: [] }, req.body);
        post.comments.push(newComment);
        yield post.save();
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
exports.BlogPostCommentCTRL = BlogPostCommentCTRL;
//DELETE A COMMENT
const BlogPostDeleteCommentCTRL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postID = req.params.post_id;
    const commentIDtoDelete = req.params.comment_id;
    try {
        let post = yield BlogPost_1.BlogPost.findByIdAndUpdate(postID);
        if (!post) {
            return res.status(400).json({ msg: "Can't find post ID" });
        }
        const newComments = post.comments.filter((comment) => {
            const commentID = comment.id.toString();
            return commentID !== commentIDtoDelete;
        });
        post.comments = newComments;
        yield post.save();
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
exports.BlogPostDeleteCommentCTRL = BlogPostDeleteCommentCTRL;
//# sourceMappingURL=postCtrl.js.map