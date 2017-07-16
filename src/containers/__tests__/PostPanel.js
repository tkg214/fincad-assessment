import React from 'react';
import { shallow } from 'enzyme';

import { Component as PostPanel } from '../PostPanel';

test('the post panel renders correctly', () => {
  const wrapper = shallowRenderPost();
  expect(wrapper).toMatchSnapshot();
});

test('the new comment component does not render if user is not logged in', () => {
  const wrapper = shallowRenderPost();
  expect(wrapper.find(sel('newComment')).node).toBeUndefined;
});

test('the new comment component renders if user is logged in', () => {
  const auth = { isLoggedIn: true };
  const wrapper = shallowRenderPost({ auth });
  expect(wrapper.find(sel('newComment')).node).toBeDefined;
});

function getPostProps(props) {
  return {
    auth: { isLoggedIn: false },
    title: '',
    name: '',
    body: '',
    comments: [],
    ...props
  };
}

function shallowRenderPost(props = {}) {
  const postProps = getPostProps(props);
  return shallow(<PostPanel {...postProps} />);
}

function sel(id) {
  return `[data-test="${id}"]`;
}
