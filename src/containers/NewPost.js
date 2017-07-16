import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Panel, Accordion } from 'react-bootstrap';

import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { createPost } from '../actions/posts';

class NewPost extends Component {
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
    const data = {
      userId: this.props.auth.userId,
      title: this.state.titleInput,
      body: this.state.bodyInput,
      name: this.props.auth.name
    };
    this.props.createPost(data);
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
    if (!this.props.auth.isLoggedIn) return null;

    const header = (
      <p>
        <FontAwesome name={this.state.icon} />
        &nbsp; New Post
      </p>
    );

    return (
      <Accordion activeKey={this.state.activeKey} onSelect={this.handleToggle}>
        <Panel header={header} eventKey="1">
          <form onSubmit={this.handleSubmit}>
            <Input
              inputLabel={'Title'}
              inputType={'text'}
              inputId={'titleInput'}
              inputValue={this.state.titleInput}
              inputPlaceholder={'Enter Title'}
              handleInputChange={this.handleInputChange}
              data-test="input"
            />
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
              Post
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
  createPost: data => {
    dispatch(createPost(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
