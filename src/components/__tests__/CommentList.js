import React from 'react';
import { shallow } from 'enzyme';

import CommentList from '../CommentList';

test('the list component renders correctly', () => {
  const wrapper = shallowRenderList();
  expect(wrapper).toMatchSnapshot();
});

test('the list component renders the correct amount of children comments', () => {
  const comments = [
    { name: 'test 1', body: 'test', email: 'test@test.com' },
    { name: 'test 2', body: 'test', email: 'test@test.com' }
  ];
  const commentCount = comments.length;
  const wrapper = shallowRenderList({ comments, commentCount });
  expect(wrapper.find(sel('comment'))).toHaveLength(commentCount);
});

function getListProps(props) {
  return {
    comments: [],
    commentCount: 0,
    ...props
  };
}

function shallowRenderList(props = {}) {
  const listProps = getListProps(props);
  return shallow(<CommentList {...listProps} />);
}

function sel(id) {
  return `[data-test="${id}"]`;
}
