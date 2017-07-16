import React from 'react';
import { render, mount } from 'enzyme';

import Post from '../Post';

test('the comment component renders with defaults', () => {
  const wrapper = renderPost();
  expect(wrapper).toMatchSnapshot();
});

test('the component renders with props passed in', () => {
  const name = 'Test Name';
  const body = 'Test Body';
  const wrapper = mountPost({ name, body });
  expect(wrapper.find(sel('name')).text()).toBe(`by ${name}`);
  expect(wrapper.find(sel('body')).text()).toBe(body);
});

function getPostProps(props = {}) {
  return {
    name: '',
    body: '',
    ...props
  };
}

function renderPost() {
  const postProps = getPostProps();
  return render(<Post {...postProps} />);
}

function mountPost(props) {
  const postProps = getPostProps(props);
  return mount(<Post {...postProps} />);
}

function sel(id) {
  return `[data-test="${id}"]`;
}
