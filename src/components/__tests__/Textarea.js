import React from 'react';
import { render, mount } from 'enzyme';

import Textarea from '../Textarea';

test('the textarea component renders with defaults', () => {
  const wrapper = renderInput();
  expect(wrapper).toMatchSnapshot();
});

test('the label renders correct props', () => {
  const inputLabel = 'Test Label';
  const wrapper = mountInput({ inputLabel });
  expect(wrapper.find(sel('label')).text()).toBe(inputLabel);
});

test('the textarea component invokes the handleInputChange prop when value changes', () => {
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

function renderInput(props = {}) {
  const inputProps = getInputProps(props);
  return render(<Textarea {...inputProps} />);
}

function mountInput(props = {}) {
  const inputProps = getInputProps(props);
  return mount(<Textarea {...inputProps} />);
}

function changeInput(wrapper) {
  wrapper
    .find(sel('textarea'))
    .simulate('change', { target: { value: 'test' } });
}

function sel(id) {
  return `[data-test="${id}"]`;
}
