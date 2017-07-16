import React from 'react';
import PropTypes from 'prop-types';

const Post = props => {
  return (
    <div>
      <h5 data-test="name">{`by ${props.name}`}</h5>
      <p data-test="body">
        {props.body}
      </p>
    </div>
  );
};

Post.propTypes = {
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export default Post;
