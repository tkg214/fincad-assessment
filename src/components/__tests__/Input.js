import React from 'react';
import { render, mount } from 'enzyme';

import Input from '../Input';

test('the input component renders with defaults', () => {
  const wrapper = renderInput();
  expect(wrapper).toMatchSnapshot();
});

test('the label renders correct props', () => {
  const inputLabel = 'Test Label';
  const wrapper = mountInput({ inputLabel });
  expect(wrapper.find(sel('label')).text()).toBe(inputLabel);
});

test('the input component invokes the handleInputChange prop when input value changes', () => {
  const handleInputChange = jest.fn();
  const wrapper = mountInput({ handleInputChange });
  changeInput(wrapper);
  expect(handleInputChange).toHaveBeenCalledTimes(1);
});

function getInputProps(props = {}) {
  return {
    inputLabel: '',
    inputType: 'text',
    inputId: '',
    inputValue: '',
    inputPlaceholder: '',
    handleInputChange: () => {},
    ...props
  };
}

function renderInput() {
  const inputProps = getInputProps();
  return render(<Input {...inputProps} />);
}

function mountInput(props = {}) {
  const inputProps = getInputProps(props);
  return mount(<Input {...inputProps} />);
}

function changeInput(wrapper) {
  wrapper.find(sel('input')).simulate('change', { target: { value: 'test' } });
}

function sel(id) {
  return `[data-test="${id}"]`;
}
