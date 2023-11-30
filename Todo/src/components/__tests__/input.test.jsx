import {fireEvent, render, screen} from '@testing-library/react-native';
import Input from '../Input';
import {
  getStyleOf,
  getEnabledInfo,
  toMatchStyle,
  getAllPlaceholderOf,
  toHavePlaceholder,
  toBeDisable,
} from 'rntl-extend-lib';

const TrueStyle = {
  height: 60,
  width: '60%',
  padding: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  marginRight: 10,
  color: '#176b87',
};

describe('Input', () => {
  let mockType;

  beforeEach(() => {
    mockType = jest.fn();
  });

  afterEach(() => {
    mockType.mockReset();
  });

  test('Input should render true', () => {
    render(<Input placeholder="Type Me!" onChangeText={mockType} />);

    const TextInput = screen.root;
    expect(TextInput).toBeDefined();
  });

  test('Input should have true placeholder', () => {
    render(<Input placeholder="Type Me!" onChangeText={mockType} />);

    const TextInput = screen.root;
    const Placeholder = getAllPlaceholderOf(TextInput);

    console.log('Placeholder:', Placeholder);
    expect(TextInput).toHavePlaceholder('Type Me!');
  });

  test('Input should match true style', () => {
    render(<Input placeholder="Type Me!" onChangeText={mockType} />);

    const TextInput = screen.root;
    const Style = getStyleOf(TextInput);

    console.log('Style Of Text Input:', Style);
    expect(TextInput).toMatchStyle(TrueStyle);
  });

  test('Input should be change when typing it', () => {
    render(<Input placeholder="Type Me!" onChangeText={mockType} />);

    const TextInput = screen.root;
    fireEvent.changeText(TextInput, 'Hello World');

    expect(mockType).toHaveBeenCalledWith('Hello World');
  });

  test('Input disable should not change when typing it', () => {
    render(
      <Input placeholder="Type Me!" onChangeText={mockType} editable={false} />,
    );

    const TextInput = screen.root;
    const EnableInfo = getEnabledInfo(TextInput);

    console.log('Enable Info Of Text Input', EnableInfo);
    fireEvent.changeText(TextInput, 'Hello World');

    expect(TextInput).toBeDisable();
    expect(mockType).not.toBeCalled();
  });
});

expect.extend({
  toHavePlaceholder,
  toMatchStyle,
  toBeDisable,
});
