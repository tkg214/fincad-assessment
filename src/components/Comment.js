import React from 'react';
import PropTypes from 'prop-types';

const Comment = props => {
  return (
    <div>
      <h5 data-test="indexCount">
        {`Comment ${props.index + 1} of ${props.count}`}
      </h5>
      <p data-test="nameEmail">
        {`by ${props.name} (${props.email})`}
      </p>
      <p data-test="body">
        {`${props.body}`}
      </p>
    </div>
  );
};

Comment.propTypes = {
  index: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export default Comment;
