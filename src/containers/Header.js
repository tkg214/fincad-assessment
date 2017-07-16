import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, logout } from '../actions/auth';
import Modal from '../components/Modal';
import Input from '../components/Input';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultClosedModalState;
    this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleLoginInputChange = this.handleLoginInputChange.bind(this);
  }

  get defaultClosedModalState() {
    return {
      showModal: false,
      usernameInput: '',
      passwordInput: ''
    };
  }

  get defaultOpenedModalState() {
    return {
      showModal: true,
      usernameInput: '',
      passwordInput: ''
    };
  }

  handleModalClose() {
    this.setState(this.defaultClosedModalState);
  }

  handleModalOpen() {
    this.setState(this.defaultOpenedModalState);
  }

  handleLogoutSubmit() {
    this.props.logout();
  }

  handleLoginInputChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.usernameInput);
    this.setState(this.defaultClosedModalState);
  }

  authed() {
    return (
      <ul className="nav navbar-nav pull-right">
        <li className="nav-item">
          <a data-test="userInfo">
            {`Logged in as ${this.props.auth.name} (${this.props.auth.email})`}
          </a>
        </li>
        <li className="nav-item" onClick={this.handleLogoutSubmit}>
          <a data-test="authed" className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );
  }

  unauthed() {
    return (
      <ul data-test="unauthed" className="nav navbar-nav pull-right">
        {this.props.auth.userError && this.error()}
        <li className="nav-item" onClick={this.handleModalOpen}>
          <a data-test="unauthed" className="nav-link">
            Login
          </a>
        </li>
      </ul>
    );
  }

  error() {
    return (
      <li className="nav-item">
        <a data-test="error">
          {this.props.auth.errorMessage}
        </a>
      </li>
    );
  }

  render() {
    const { isLoggedIn } = this.props.auth;

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-brand">FINCAD Tech Assessment</div>
            {isLoggedIn ? this.authed() : this.unauthed()}
          </div>
        </nav>
        <Modal
          closeModal={this.handleModalClose}
          showModal={this.state.showModal}
          modalTitle={'Login'}
        >
          <form onSubmit={this.handleLoginSubmit}>
            <Input
              inputLabel={'Username'}
              inputType={'input'}
              inputId={'usernameInput'}
              inputValue={this.state.usernameInput}
              inputPlaceholder={'Enter Username'}
              handleInputChange={this.handleLoginInputChange}
              data-test="username"
            />
            <Input
              inputLabel={'Password'}
              inputType={'password'}
              inputId={'passwordInput'}
              inputValue={this.state.passwordInput}
              inputPlaceholder={'Enter Password'}
              handleInputChange={this.handleLoginInputChange}
              data-test="password"
            />
            <button
              style={{ marginLeft: '10px' }}
              className="btn pull-right"
              onClick={this.handleModalClose}
            >
              Close
            </button>
            <button className="btn pull-right" type="submit" data-test="submit">
              Login
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  login: username => {
    dispatch(login(username));
  },
  logout: () => {
    dispatch(logout());
  }
});

export { Header as Component };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
