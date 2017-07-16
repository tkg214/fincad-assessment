import Immutable from 'seamless-immutable';

import {
  FETCH_ALL_POSTS_REQUEST,
  FETCH_ALL_POSTS_SUCCESS,
  FETCH_COMMENTS_SUCCESS,
  CREATE_POST_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  UPDATE_POST_ACTIVE,
  UPDATE_COMMENT_ACTIVE
} from '../constants/actions';

const initialState = Immutable({
  isFetching: false,
  isFetched: false,
  list: []
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_POSTS_REQUEST: {
      return Immutable.set(state, 'isFetching', true);
    }
    case FETCH_ALL_POSTS_SUCCESS: {
      return Immutable.merge(state, {
        list: action.payload,
        isFetching: false,
        isFetched: true
      });
    }
    case FETCH_COMMENTS_SUCCESS: {
      if (action.payload.length) {
        let i;

        // filters posts to determine position i of post in array and returns post to update
        const postToUpdate = state.list.filter((post, index) => {
          if (post.id === action.payload[0].postId) {
            i = index;
          }
          return post.id === action.payload[0].postId;
        });

        // merges comments in the filtered post object
        const updatedPost = Immutable.merge(postToUpdate[0], {
          comments: action.payload
        });

        // maps updated post based on its position as determined by i above and creates new list
        const updatedList = state.list.map((post, index) => {
          return index === i ? updatedPost : post;
        });

        return Immutable.merge(state, {
          list: updatedList
        });
      } else {
        return state;
      }
    }
    case CREATE_POST_SUCCESS: {
      const updatedList = [action.payload].concat(state.list).sort((a, b) => {
        return a.id - b.id;
      });
      return Immutable.merge(state, {
        list: updatedList
      });
    }
    case CREATE_COMMENT_SUCCESS: {
      let i;
      const postToUpdate = state.list.filter((post, index) => {
        if (post.id === action.payload.postId) {
          i = index;
        }
        return post.id === action.payload.postId;
      });
      const updatedComments = [action.payload]
        .concat(postToUpdate[0].comments)
        .sort((a, b) => {
          return a.id - b.id;
        });

      const updatedPost = Immutable.merge(postToUpdate[0], {
        comments: updatedComments
      });

      const updatedList = state.list.map((post, index) => {
        return index === i ? updatedPost : post;
      });

      return Immutable.merge(state, {
        list: updatedList
      });
    }
    case UPDATE_POST_ACTIVE: {
      let i;
      const postToUpdate = state.list.filter((post, index) => {
        if (post.id === action.payload) {
          i = index;
        }
        return post.id === action.payload;
      });

      const updatedPost = Immutable.set(postToUpdate[0], 'active', false);

      const updatedList = state.list.map((post, index) => {
        return index === i ? updatedPost : post;
      });

      return Immutable.merge(state, {
        list: updatedList
      });
    }
    case UPDATE_COMMENT_ACTIVE: {
      let i;
      let n;
      const postToUpdate = state.list.filter((post, index) => {
        if (post.id === action.payload.postId) {
          i = index;
        }
        return post.id === action.payload.postId;
      });
      const commentToUpdate = postToUpdate[0].comments.filter(
        (comment, index) => {
          if (comment.id === action.payload.id) {
            n = index;
          }
          return comment.id === action.payload.id;
        }
      );
      const updatedComment = Immutable.set(commentToUpdate[0], 'active', false);

      const updatedComments = postToUpdate[0].comments.map((comment, index) => {
        return index === n ? updatedComment : comment;
      });

      const updatedPost = Immutable.merge(postToUpdate[0], {
        comments: updatedComments
      });

      const updatedList = state.list.map((post, index) => {
        return index === i ? updatedPost : post;
      });

      return Immutable.merge(state, {
        list: updatedList
      });
    }
    default: {
      return state;
    }
  }
}
