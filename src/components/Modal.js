import React, { Component } from 'react';

class Modal extends Component {
  close(e) {
    e.preventDefault();
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }

  render() {
    if (this.props.showModal === false) return null;

    const modalStyle = {
      borderRadius: '5px',
      position: 'absolute',
      top: '20%',
      left: '50%',
      padding: '50px',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      width: '60%',
      background: '#fff'
    };

    const backdropStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)'
    };

    return (
      <div>
        <div style={modalStyle}>
          <h2 data-test="title">
            {this.props.modalTitle}
          </h2>
          {this.props.children}
        </div>
        <div style={backdropStyle} onClick={this.close.bind(this)} />
      </div>
    );
  }
}

export default Modal;
