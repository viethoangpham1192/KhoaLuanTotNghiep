import 'react-native';
import React from 'react';
import {Text, View} from 'react-native';
import {render, screen} from '@testing-library/react-native';

import Login from '../src/components/Login/Login';

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

test('render_1', async () => {
  render(
    <View>
      <View>
        <Text>Phạm Việt Hoàng</Text>
      </View>
      <View>
        <Text>Thanh Tùng Đặng</Text>
        <View>
          <Text>Phạm Hoàng Việt</Text>
        </View>
      </View>
    </View>,
  );

  console.log(getAllTextOf(screen.root));

  expect(screen.root).toHaveText([
    'Phạm Việt Hoàng',
    'Thanh Tùng Đặng',
    'Phạm Hoàng Việt',
  ]);
});

test('render_2', async () => {
  render(
    <View>
      <View>
        <Text>Phạm Việt Hoàng</Text>
      </View>
      <View>
        <Text>Thanh Tùng Đặng</Text>
        <View>
          <Text>Phạm Hoàng Việt</Text>
        </View>
      </View>
    </View>,
  );

  console.log(screen.getByText('Phạm Việt Hoàng').children[0]);

  expect(screen.getByText('Phạm Việt Hoàng')).toBeTruthy();
  expect(screen.getByText('Thanh Tùng Đặng')).toBeTruthy();
  expect(screen.getByText('Phạm Hoàng Việt')).toBeTruthy();
});

test('render_3', async () => {
  const {getByTestId} = render(<Login title="login" />);
  const Component = getByTestId('Component');
  console.log(getAllPlaceholderOf(Component));

  expect(Component).toHavePlaceholder(['Account', 'Password']);
});

test('render_4', async () => {
  const {getByPlaceholderText} = render(<Login title="login" />);
  console.log(
    getByPlaceholderText('Account').props.placeholder,
    getByPlaceholderText('Password').props.placeholder,
  );
  expect(getByPlaceholderText('Account')).toBeTruthy();
  expect(getByPlaceholderText('Password')).toBeTruthy();
});

test('render_5', async () => {
  const {getByTestId} = render(<Login title="login" />);
  const test = getByTestId('switch');
  console.log(getStyleOf(test));

  expect(test).toBeOfStyle({
    height: 31,
    width: 51,
    color: 'white',
    backgroundColor: '#3e3e3e',
    borderRadius: 16,
  });
});

test('render_6', async () => {
  const {getByTestId} = render(<Login title="login" />);
  const test = getByTestId('switch');
  console.log(getStyleOf(test));

  expect(getStyleOf(test)).toEqual({
    height: 31,
    width: 51,
    color: 'white',
    backgroundColor: '#3e3e3e',
    borderRadius: 16,
  });
});

test('render_7', async () => {
  const {getByPlaceholderText} = render(<Login title="login" />);
  console.log(
    getByPlaceholderText('Account').props.value,
    getByPlaceholderText('Password').props.value,
  );
  expect(getByPlaceholderText('Account').props.value).toEqual('Account');
  expect(getByPlaceholderText('Password').props.value).toEqual('Password');
});

test('render_8', async () => {
  const {getByTestId} = render(<Login title="login" />);
  const Button = getByTestId('RealButton');

  expect(Button).toBeDisable();
});

test('render_9', async () => {
  const {getByTestId} = render(<Login title="login" />);
  const Button = getByTestId('RealButton');

  expect(Button.props.disabled).toEqual(true);
});

test('render_10', async () => {
  const {getByTestId} = render(<Login title="login" />);
  const Component = getByTestId('Component');
  const Button = getByTestId('RealButton');
  // console.log(Component.children[0]);

  expect(Component).toIncludeComponent(Button);
});

test.only('render_11', async () => {
  const {getByPlaceholderText, getByTestId} = render(<Login title="login" />);

  const Component = getByTestId('Component');

  console.log(getAllValueOf(Component));

  expect(Component).toHaveValue(false);
  // const input = getByPlaceholderText('Account');
  // const button = getByTestId('RealButton');

  // console.log(getStyleOf(button));
  // console.log(getAllValueOf(screen.root));

  // expect(input).toBeEnable();
  // expect(button).toBeEnable();
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
