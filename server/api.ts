import { Post } from './types';

//post apis
export interface ListPostRequest {}
export interface ListPostResponse {
  posts: Post[];
}

export type CreatePostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
export interface CreatePostResponse {}

export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post;
}

//comment APis

//Likes APIs

//User APIs
