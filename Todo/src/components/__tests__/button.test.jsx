import {fireEvent, render, screen} from '@testing-library/react-native';
import {AddButton, TextButton} from '../Button';
import {
  getStyleOf,
  getEnabledInfo,
  getAllTextOf,
  toHaveText,
  toMatchStyle,
  getChildrenOf,
  toBeDisable,
} from 'rntl-extend-lib';

const TrueStyleAddButton = {
  height: 60,
  width: 60,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: 100,
  opacity: 1,
};

const TrueStyleEnable = {
  color: '#053b50',
  fontSize: 22,
};

const TrueStyleDisable = {
  color: '#a9b8bd',
  fontSize: 22,
};

const TrueStyleTextButton = {
  flex: 1,
  justifyContent: 'center',
  opacity: 1,
};

describe('Add Button', () => {
  let mockPress;

  beforeEach(() => {
    mockPress = jest.fn();
  });

  afterEach(() => {
    mockPress.mockReset();
  });

  test('Add Button should render true', () => {
    render(<AddButton onPress={mockPress} />);

    const Button = screen.root;
    expect(Button).toBeDefined();
  });

  test('Text in Add Button should be +', () => {
    render(<AddButton onPress={mockPress} />);

    const Button = screen.root;
    const Text = getAllTextOf(Button);

    console.log('Text:', Text);
    expect(Button).toHaveText('+');
  });

  test('Style of Add Button should be true style', () => {
    render(<AddButton onPress={mockPress} />);

    const Button = screen.root;
    const StyleOfButton = getStyleOf(Button);

    console.log('Style Of Button:', StyleOfButton);
    expect(Button).toMatchStyle(TrueStyleAddButton);
  });

  test('Style of child in Add Button should be true style', () => {
    render(<AddButton onPress={mockPress} />);

    const Button = screen.root;
    const Child = getChildrenOf(Button)[0];
    const StyleOfChild = getStyleOf(Child);

    console.log('Style Of Child Enable:', StyleOfChild);
    expect(Child).toMatchStyle(TrueStyleEnable);
  });

  test('Style of child in Add Button should be true style when it disable', () => {
    render(<AddButton onPress={mockPress} disabled={true} />);

    const Button = screen.root;
    const Child = getChildrenOf(Button)[0];
    const StyleOfChild = getStyleOf(Child);
    const EnableInfo = getEnabledInfo(Button);

    console.log('Enable Info:', EnableInfo);
    console.log('Style Of Child Enable:', StyleOfChild);

    expect(Child).toMatchStyle(TrueStyleDisable);
    expect(Button).toBeDisable();
  });

  test('Press on Add Button should be active when it enable', () => {
    render(<AddButton onPress={mockPress} />);

    const Button = screen.root;
    fireEvent.press(Button);

    expect(mockPress).toBeCalled();
  });

  test('Press on Add Button should be fail when it disable', () => {
    render(<AddButton onPress={mockPress} disabled={true} />);

    const Button = screen.root;
    const IsEnable = getEnabledInfo(Button);

    console.log('Enable Info:', IsEnable);
    fireEvent.press(Button);

    expect(mockPress).not.toBeCalled();
  });
});

describe('Text Button', () => {
  let mockPress;

  beforeEach(() => {
    mockPress = jest.fn();
  });

  afterEach(() => {
    mockPress.mockReset();
  });

  test('Text Button should render true', () => {
    render(<TextButton onPress={mockPress}>Click Me!</TextButton>);

    const Button = screen.root;
    expect(Button).toBeDefined();
  });

  test('The text in the Button should be correct', () => {
    render(<TextButton onPress={mockPress}>Click Me!</TextButton>);

    const Button = screen.root;
    const Text = getAllTextOf(Button);

    console.log('Text in Button:', Text);
    expect(Button).toHaveText('Click Me!');
  });

  test('Style of Text Button should be true style', () => {
    render(<TextButton onPress={mockPress}>Click Me!</TextButton>);

    const Button = screen.root;
    const StyleOfButton = getStyleOf(Button);

    console.log('Style Of Text Button:', StyleOfButton);
    expect(Button).toMatchStyle(TrueStyleTextButton);
  });

  test('Press on Text Button should be active when it enable', () => {
    render(<TextButton onPress={mockPress}>Click Me!</TextButton>);

    const Button = screen.root;
    fireEvent.press(Button);

    expect(mockPress).toBeCalled();
  });

  test('Press on Text Button should be fail when it disable', () => {
    render(
      <TextButton onPress={mockPress} disabled={true}>
        Click Me!
      </TextButton>,
    );

    const Button = screen.root;
    const IsEnable = getEnabledInfo(Button);

    console.log('Enable Info:', IsEnable);
    fireEvent.press(Button);

    expect(Button).toBeDisable();
    expect(mockPress).not.toBeCalled();
  });
});

expect.extend({
  toHaveText,
  toMatchStyle,
  toBeDisable,
});
