import 'react-native';
import React, {Component} from 'react';
import {render, screen} from '@testing-library/react-native';
import {
  toHaveText,
  toHavePlaceholder,
  toIncludeComponent,
  toHaveProps,
  toHaveValue,
} from '../src/test-tool/toHaveInformation';
import {
  getAllTextOf,
  getAllPlaceholderOf,
  getAllValueOf,
} from '../src/test-tool/getAllInformation';
import Login from '../src/components/Login/Login';
import {
  getStyleOf,
  getParentOf,
  getChildrenOf,
  getTypeOf,
  getPropsOf,
} from '../src/test-tool/getInformation';
import {
  toBeOfStyle,
  toBeDisable,
  toBeEnable,
} from '../src/test-tool/toBeStatus';

test.only('render_2', async () => {
  const {getByTestId} = render(<Login title="login" />);
  const Component = getByTestId('Component');

  console.log(getAllValueOf(Component));

  expect(Component).toHaveValue(['Account', 'Password']);
});

test('render_1', async () => {
  const {getByTestId} = render(<Login title="login" />);
  const test = getByTestId('switch');

  expect(getStyleOf(test)).toEqual({
    height: 31,
    width: 51,
    color: 'white',
    backgroundColor: '#3e3e3e',
    borderRadius: 16,
  });
});

expect.extend({
  toHaveText,
  toHavePlaceholder,
  toBeOfStyle,
  toIncludeComponent,
  toBeDisable,
  toBeEnable,
  toHaveProps,
  getParentOf,
  toHaveValue,
});