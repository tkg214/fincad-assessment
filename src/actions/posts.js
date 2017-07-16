import axios from 'axios';
import { createAction } from 'redux-actions';

import {
  FETCH_ALL_POSTS_REQUEST,
  FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST_ACTIVE
} from '../constants/actions';
import { join } from '../utils/join';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST
});

export const fetchAllPostsRequest = createAction(FETCH_ALL_POSTS_REQUEST);
export const fetchAllPostsSuccess = createAction(FETCH_ALL_POSTS_SUCCESS);
export const fetchAllPostsFailure = createAction(FETCH_ALL_POSTS_FAILURE);

export const fetchAllPosts = () => dispatch => {
  let postsArray;
  dispatch(fetchAllPostsRequest());
  return api
    .get('/posts')
    .then(res => {
      if (res.status !== 200) throw Error(res.statusText);
      postsArray = res.data;
      return api.get('/users');
    })
    .then(res => {
      if (res.status !== 200) throw Error(res.statusText);
      return res.data;
    })
    .then(data => {
      const usersArray = data;
      // join is a helper function that takes in two datasets and their respective keys to join on
      // along with a callback that specifies what properties to return in the new dataset
      const joinedData = join(
        usersArray,
        postsArray,
        'id',
        'userId',
        (post, user) => {
          return {
            id: post.id,
            name: user.name,
            title: post.title,
            body: post.body,
            comments: [],
            active: false
          };
        }
      );
      const sortedData = joinedData.sort((a, b) => {
        return a.id - b.id;
      });
      dispatch(fetchAllPostsSuccess(sortedData));
    })
    .catch(() => {
      dispatch(fetchAllPostsFailure());
    });
};

export const createPostRequest = createAction(CREATE_POST_REQUEST);
export const createPostSuccess = createAction(CREATE_POST_SUCCESS);
export const createPostFailure = createAction(CREATE_POST_FAILURE);
export const updatePostActive = createAction(UPDATE_POST_ACTIVE);

export const createPost = post => dispatch => {
  dispatch(createPostRequest());
  return api
    .post('/posts', {
      userId: post.userId,
      title: post.title,
      body: post.body
    })
    .then(res => {
      if (res.status !== 201) throw Error(res.statusText);
      return res.data;
    })
    .then(data => {
      data.name = post.name;
      data.active = true;
      data.comments = [];
      data.id = Date.now();
      dispatch(createPostSuccess(data));
      dispatch(updatePostActive(data.id));
    })
    .catch(() => {
      dispatch(createPostFailure());
    });
};
