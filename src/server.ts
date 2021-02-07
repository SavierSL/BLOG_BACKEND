import http from "http";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import logging from "../src/config/logging";
// import config from "../src/config/config";
import sample from "./routes/sample";
import { connectDB } from "./config/db";
import { Res, Req, Nxt } from "../src/TS/types";
// routers
import users from "../src/routes/users";
import auth from "../src/routes/auth";
import post from "../src/routes/post";
import profile from "../src/routes/profile";

import multer from "multer";

const NAMESPACE = "Server";
const router = express.Router();
const app = express();

//Connect to DataBase
connectDB();

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
app.use(cookieParser());
//so we can upload high image
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Rules of our API
app.use((req: Req, res: Res, next: Nxt) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

  next();
});

//Routes
app.use("/sample", sample.router);
app.use("/users", users.router);
app.use("/auth", auth.router);
app.use("/post", post.router);
app.use("/profile", profile.router);

//Error Handling
app.use((req: Req, res: Res, next: Nxt) => {
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
