import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Comment from './Comment';

class CommentList extends Component {
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this['_new']);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    return (
      <div data-test="list">
        {this.props.comments.map((comment, index) => {
          return (
            <Comment
              data-test="comment"
              key={index}
              index={index}
              count={this.props.commentCount}
              {...comment}
              ref={ref => (comment.active ? (this['_new'] = ref) : null)}
            />
          );
        })}
      </div>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  commentCount: PropTypes.number.isRequired
};

export default CommentList;
