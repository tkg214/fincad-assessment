import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PostPanel from '../containers/PostPanel';

class PostList extends Component {
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
        {this.props.list.map((post, index) => {
          return (
            <PostPanel
              data-test="post"
              key={index}
              {...post}
              ref={ref => (post.active ? (this['_new'] = ref) : null)}
            />
          );
        })}
      </div>
    );
  }
}

PostList.propTypes = {
  list: PropTypes.array.isRequired
};

export default PostList;
