import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Accordion, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { fetchComments } from '../actions/comments';
import CommentList from '../components/CommentList';
import Post from '../components/Post';
import NewComment from './NewComment';

class PostPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentView: 'View Comments',
      commentsVisible: false,
      bodyInput: '',
      commentIcon: 'caret-square-o-right',
      activeKey: ''
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  handleToggle(activeKey) {
    !this.state.commentsVisible &&
      this.props.comments.length === 0 &&
      this.props.fetchComments(this.props.id);
    this.state.commentsVisible
      ? this.setState({
          commentView: 'View Comments',
          commentsVisible: false,
          commentIcon: 'caret-square-o-right',
          activeKey: ''
        })
      : this.setState({
          commentView: 'Close Comments',
          commentsVisible: true,
          commentIcon: 'caret-square-o-down',
          activeKey
        });
  }

  handleCommentSubmit() {
    this.setState({
      commentView: 'Close Comments',
      commentsVisible: true,
      commentIcon: 'caret-square-o-down',
      activeKey: '1'
    });
  }

  render() {
    const { title, body, name, comments, id } = this.props;
    const postHeader = (
      <h2>
        {title}
      </h2>
    );

    const commentsHeader = (
      <p>
        <FontAwesome name={this.state.commentIcon} />
        &nbsp; {this.state.commentView}
      </p>
    );
    const commentCount = comments.length;

    return (
      <div>
        <Panel header={postHeader}>
          <Post data-test="post" name={name} body={body} />
          <Accordion
            activeKey={this.state.activeKey}
            onSelect={this.handleToggle}
          >
            <Panel header={commentsHeader} eventKey="1">
              <Col md={10} mdOffset={2}>
                {commentCount > 0
                  ? <CommentList
                      comments={comments}
                      commentCount={commentCount}
                    />
                  : <p>{`There are no comments for this post.`}</p>}
              </Col>
            </Panel>
          </Accordion>
          {this.props.auth.isLoggedIn &&
            <NewComment
              commentsVisible={this.state.commentsVisible}
              handleCommentSubmit={this.handleCommentSubmit}
              commentCount={commentCount}
              postId={id}
              data-test="newComment"
            />}
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  fetchComments: postId => {
    dispatch(fetchComments(postId));
  }
});

export { PostPanel as Component };
export default connect(mapStateToProps, mapDispatchToProps)(PostPanel);
