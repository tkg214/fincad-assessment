import React from 'react';
import { shallow } from 'enzyme';

import Modal from '../Modal';

test('the modal renders correctly', () => {
  const wrapper = shallowRenderModal();
  expect(wrapper).toMatchSnapshot();
});

test('the modal does not open if showModal is false', () => {
  const wrapper = shallowRenderModal();
  expect(wrapper).toBeNull;
});

test('the modal opens with correct props if showModal is true', () => {
  const showModal = true;
  const modalTitle = 'Test Title';
  const wrapper = shallowRenderModal({ showModal, modalTitle });
  expect(wrapper.find(sel('title')).text()).toBe(modalTitle);
});

function getModalProps(props) {
  return {
    showModal: false,
    modalTitle: '',
    ...props
  };
}

function shallowRenderModal(props = {}) {
  const modalProps = getModalProps(props);
  return shallow(<Modal {...modalProps} />);
}

function sel(id) {
  return `[data-test="${id}"]`;
}
