import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Panel, Accordion } from 'react-bootstrap';

import { createComment, fetchComments } from '../actions/comments';
import Textarea from '../components/Textarea';

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultClosedState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  get defaultClosedState() {
    return {
      activeKey: '',
      titleInput: '',
      bodyInput: '',
      isVisible: false,
      icon: 'plus'
    };
  }

  get defaultOpenedState() {
    return {
      activeKey: '1',
      titleInput: '',
      bodyInput: '',
      isVisible: true,
      icon: 'minus'
    };
  }

  handleInputChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    !this.props.commentsVisible &&
      this.props.commentCount === 0 &&
      this.props.fetchComments(this.props.postId);
    const data = {
      userId: this.props.auth.userId,
      postId: this.props.postId,
      body: this.state.bodyInput,
      name: this.props.auth.name,
      email: this.props.auth.email
    };
    this.props.handleCommentSubmit();
    this.props.createComment(data);
    this.setState(this.defaultClosedState);
  }

  handleToggle(activeKey) {
    this.state.isVisible
      ? this.setState({
          isVisible: false,
          icon: 'plus',
          activeKey: ''
        })
      : this.setState({
          isVisible: true,
          icon: 'minus',
          activeKey
        });
  }

  render() {
    const header = (
      <p>
        <FontAwesome name={this.state.icon} />
        &nbsp; New Comment
      </p>
    );

    return (
      <Accordion activeKey={this.state.activeKey} onSelect={this.handleToggle}>
        <Panel header={header} eventKey="1">
          <form onSubmit={this.handleSubmit}>
            <Textarea
              inputLabel={'Body'}
              inputType={'text'}
              inputId={'bodyInput'}
              inputValue={this.state.bodyInput}
              inputPlaceholder={'Enter Body'}
              handleInputChange={this.handleInputChange}
              data-test="textarea"
            />
            <button className="btn" type="submit" data-test="submit">
              Submit
            </button>
          </form>
        </Panel>
      </Accordion>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  createComment: data => {
    dispatch(createComment(data));
  },
  fetchComments: postId => {
    dispatch(fetchComments(postId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
