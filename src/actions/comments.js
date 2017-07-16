import axios from 'axios';
import { createAction } from 'redux-actions';

import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  UPDATE_COMMENT_ACTIVE
} from '../constants/actions';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST
});

export const fetchCommentsRequest = createAction(FETCH_COMMENTS_REQUEST);
export const fetchCommentsSuccess = createAction(FETCH_COMMENTS_SUCCESS);
export const fetchCommentsFailure = createAction(FETCH_COMMENTS_FAILURE);

export const fetchComments = postId => dispatch => {
  dispatch(fetchCommentsRequest());
  return api
    .get(`/posts/${postId}/comments`)
    .then(res => {
      if (res.status !== 200) throw Error(res.statusText);
      return res.data;
    })
    .then(data => {
      dispatch(fetchCommentsSuccess(data));
    })
    .catch(() => {
      dispatch(fetchCommentsFailure());
    });
};

export const createCommentRequest = createAction(CREATE_COMMENT_REQUEST);
export const createCommentSuccess = createAction(CREATE_COMMENT_SUCCESS);
export const createCommentFailure = createAction(CREATE_COMMENT_FAILURE);
export const updateCommentActive = createAction(UPDATE_COMMENT_ACTIVE);

export const createComment = comment => dispatch => {
  dispatch(createCommentRequest());
  return api
    .post('/comments', {
      postId: comment.postId,
      name: comment.name,
      email: comment.email,
      body: comment.body
    })
    .then(res => {
      if (res.status !== 201) throw Error(res.statusText);
      return res.data;
    })
    .then(data => {
      data.active = true;
      data.postId = comment.postId;
      data.id = Date.now();
      dispatch(createCommentSuccess(data));
      dispatch(
        updateCommentActive({
          id: data.id,
          postId: data.postId
        })
      );
    })
    .catch(() => {
      dispatch(createCommentFailure());
    });
};
