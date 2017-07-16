import React from 'react';
import { shallow } from 'enzyme';

import PostList from '../PostList';

test('the list component renders correctly', () => {
  const wrapper = shallowRenderList();
  expect(wrapper).toMatchSnapshot();
});

test('the list component renders the correct amount of children posts', () => {
  const list = [
    { name: 'test 1', body: 'test' },
    { name: 'test 2', body: 'test' },
    { name: 'test 3', body: 'test' }
  ];
  const wrapper = shallowRenderList({ list });
  expect(wrapper.find(sel('post'))).toHaveLength(list.length);
});

function getListProps(props) {
  return {
    list: [],
    ...props
  };
}

function shallowRenderList(props = {}) {
  const listProps = getListProps(props);
  return shallow(<PostList {...listProps} />);
}

function sel(id) {
  return `[data-test="${id}"]`;
}
