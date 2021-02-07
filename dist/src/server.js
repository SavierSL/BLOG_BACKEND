"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import logging from "../src/config/logging";
// import config from "../src/config/config";
const sample_1 = __importDefault(require("./routes/sample"));
const db_1 = require("./config/db");
// routers
const users_1 = __importDefault(require("../src/routes/users"));
const auth_1 = __importDefault(require("../src/routes/auth"));
const post_1 = __importDefault(require("../src/routes/post"));
const profile_1 = __importDefault(require("../src/routes/profile"));
const NAMESPACE = "Server";
const router = express_1.default.Router();
const app = express_1.default();
//Connect to DataBase
db_1.connectDB();
//Logging the request
// app.use((req: Req, res: Res, next) => {
//   logging.info(
//     NAMESPACE,
//     `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
//   );
//   res.on("finish", () => {
//     logging.info(
//       NAMESPACE,
//       `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${req.statusCode}]`
//     );
//   });
//   next();
// });
//Parse the request
app.use(cookie_parser_1.default());
//so we can upload high image
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
// Rules of our API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});
//Routes
app.use("/sample", sample_1.default.router);
app.use("/users", users_1.default.router);
app.use("/auth", auth_1.default.router);
app.use("/post", post_1.default.router);
app.use("/profile", profile_1.default.router);
//Error Handling
app.use((req, res, next) => {
    const error = "api not found";
    res.status(404).json({
        message: error,
    });
    next();
});
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("blog-client/build"));
// }
//Create the server
// const httpServer = http.createServer(() => router);
app.listen(process.env.PORT || 5000, () => console.log(NAMESPACE, `Connected`)); //process.env.PORT
//pack
// "build": "rm -rf build && prettier --write src/ && tsc"
//# sourceMappingURL=server.js.map