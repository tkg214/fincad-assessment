import Immutable from 'seamless-immutable';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../constants/actions';

const initialState = Immutable({
  isLoggedIn: false
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return Immutable.replace(state, initialState);
    }
    case LOGIN_SUCCESS: {
      return Immutable.merge(state, {
        userError: false,
        isLoggedIn: true,
        userId: action.payload.id,
        name: action.payload.name,
        email: action.payload.email
      });
    }
    case LOGIN_FAILURE: {
      if (action.payload.userError) {
        return Immutable.merge({
          userError: true,
          errorMessage: action.payload.errorMessage
        });
      }
      return state;
    }
    case LOGOUT: {
      return Immutable.replace(state, initialState);
    }
    default: {
      return state;
    }
  }
}
