import express, { ErrorRequestHandler, RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import { db } from './datastore';
import { createPostHandler, listPostHandler } from './handlers/postHandlers';

const app = express();
app.use(express.json());

const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, ' - body: ', req.body);
  next();
};

app.use(requestLoggerMiddleware);

app.get('/v1/posts', asyncHandler(listPostHandler));
app.post('/v1/posts', asyncHandler(createPostHandler));

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('Uncaught exception ', err);
  return res.sendStatus(500).send('Internal server error');
};

app.use(errorHandler);

app.listen(3000, () => {
  console.log('server is up and running on port 3000');
});
