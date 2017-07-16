import axios from 'axios';
import { createAction } from 'redux-actions';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../constants/actions';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST
});

export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);

export const login = username => dispatch => {
  dispatch(loginRequest());
  return api
    .get(`/users?username=${username}`)
    .then(res => {
      if (res.status !== 200) throw Error(res.statusText);
      return res.data;
    })
    .then(data => {
      if (data.length) {
        dispatch(loginSuccess(data[0]));
      } else {
        dispatch(
          loginFailure({
            userError: true,
            errorMessage: 'Your username or password is incorrect.'
          })
        );
      }
    })
    .catch(() => {
      dispatch(loginFailure());
    });
};

export const logout = createAction(LOGOUT);
