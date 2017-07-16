import React from 'react';
import { render, mount } from 'enzyme';

import Comment from '../Comment';

test('the comment component renders with defaults', () => {
  const wrapper = renderComment();
  expect(wrapper).toMatchSnapshot();
});

test('the component renders with props passed in', () => {
  const index = 0;
  const count = 1;
  const name = 'Test Name';
  const email = 'test@test.com';
  const body = 'Test Body';
  const wrapper = mountComment({ index, count, name, email, body });
  expect(wrapper.find(sel('indexCount')).text()).toBe(
    `Comment ${index + 1} of ${count}`
  );
  expect(wrapper.find(sel('nameEmail')).text()).toBe(`by ${name} (${email})`);
  expect(wrapper.find(sel('body')).text()).toBe(body);
});

function getCommentProps(props = {}) {
  return {
    index: 0,
    count: 0,
    name: '',
    email: '',
    body: '',
    ...props
  };
}

function renderComment() {
  const commentProps = getCommentProps();
  return render(<Comment {...commentProps} />);
}

function mountComment(props) {
  const commentProps = getCommentProps(props);
  return mount(<Comment {...commentProps} />);
}

function sel(id) {
  return `[data-test="${id}"]`;
}
