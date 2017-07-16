import React from 'react';
import PropTypes from 'prop-types';

const Textarea = props => {
  return (
    <fieldset className="form-group">
      <label data-test="label">
        {props.inputLabel}
      </label>
      <textarea
        className="form-control"
        id={props.inputId}
        value={props.inputValue}
        placeholder={props.inputPlaceholder}
        onChange={props.handleInputChange}
        data-test="textarea"
      />
    </fieldset>
  );
};

Textarea.propTypes = {
  inputLabel: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default Textarea;
