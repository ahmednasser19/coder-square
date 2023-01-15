import crypto from 'crypto';

import { CreatePostRequest, CreatePostResponse, ListPostRequest, ListPostResponse } from '../api';
import { db } from '../datastore';
import { Post } from '../types';
import { ExpressHandler } from '../types';

export const listPostHandler: ExpressHandler<ListPostRequest, ListPostResponse> = async (
  req,
  res
) => {
  res.send({ posts: await db.listPosts() });
};

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (
  req,
  res
) => {
  if (!req.body.title) {
    return res.status(400).send({ error: 'title is required' });
  }

  if (!req.body.title || !req.body.url || !req.body.userId) {
    return res.sendStatus(400);
  }
  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    userId: req.body.userId,
    title: req.body.title,
    url: req.body.url,
  };

  await db.createPost(post);
  res.sendStatus(200);
};
