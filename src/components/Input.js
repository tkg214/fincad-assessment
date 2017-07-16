import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {
  return (
    <fieldset className="form-group">
      <label data-test="label">
        {props.inputLabel}
      </label>
      <input
        className="form-control"
        type={props.inputType}
        id={props.inputId}
        value={props.inputValue}
        placeholder={props.inputPlaceholder}
        onChange={props.handleInputChange}
        data-test="input"
      />
    </fieldset>
  );
};

Input.propTypes = {
  inputLabel: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default Input;
