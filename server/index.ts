import express, { RequestHandler } from "express";
import { db } from "./datastore";
import { listPostHandler, createPostHandler } from "./handlers/postHandlers";
const app = express();
app.use(express.json());

const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, " - body: ", req.body);
  next();
};

app.use(requestLoggerMiddleware);

app.get("/posts", listPostHandler);

app.post("/posts", createPostHandler);

app.listen(3000, () => {
  console.log("server is up and running on port 3000");
});
