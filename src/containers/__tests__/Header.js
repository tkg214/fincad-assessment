import React from 'react';
import { shallow } from 'enzyme';

import { Component as Header } from '../Header';

test('the header should render correctly', () => {
  const wrapper = shallowRenderHeader();
  expect(wrapper).toMatchSnapshot();
});

test('the logout button and user info should not be displayed if unauthenticated', () => {
  const wrapper = shallowRenderHeader();
  expect(wrapper.find(sel('authed')).node).toBeUndefined;
});

test('the logout button and user should info be displayed if authenticated', () => {
  const auth = {
    isLoggedIn: true,
    name: 'Test Name',
    email: 'test@test.com'
  };
  const wrapper = shallowRenderHeader({ auth });
  expect(wrapper.find(sel('authed')).node).toBeDefined;
  expect(wrapper.find(sel('userInfo')).text()).toBe(
    `Logged in as ${auth.name} (${auth.email})`
  );
});

test('the header displays an error message if there is an error prop', () => {
  const auth = {
    isLoggedIn: false,
    userError: true,
    errorMessage: 'Test Error Message'
  };
  const wrapper = shallowRenderHeader({ auth });
  expect(wrapper.find(sel('error')).text()).toBe(auth.errorMessage);
});

function getHeaderProps(props) {
  return {
    auth: {
      isLoggedIn: false,
      name: '',
      email: '',
      userError: false,
      errorMessage: ''
    },
    ...props
  };
}

function shallowRenderHeader(props = {}) {
  const headerProps = getHeaderProps(props);
  return shallow(<Header {...headerProps} />);
}

function sel(id) {
  return `[data-test="${id}"]`;
}
