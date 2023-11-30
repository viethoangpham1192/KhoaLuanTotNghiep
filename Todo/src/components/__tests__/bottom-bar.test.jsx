import {fireEvent, render, screen} from '@testing-library/react-native';
import BottomBar from '../BottomBar';
import {
  getStyleOf,
  getEnabledInfo,
  getAllTextOf,
  toHaveText,
  toMatchStyle,
  getChildrenOf,
  toBeDisable,
  toHavePlaceholder,
  getAllPlaceholderOf,
  getAllValueOf,
  toHaveValue,
  getParentOf,
} from 'rntl-extend-lib';

const TrueStyle = {
  flex: 2,
  height: 'fit-content',
  width: '100%',
};

const TrueStyleChild = {
  flexDirection: 'row',
  height: 80,
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 22,
  fontWeight: '700',
  color: '#053b50',
};

const TrueValue = [
  {
    done: false,
    id: 0,
    task: 'do exercise',
  },
];

describe('Bottom Bar', () => {
  let mockSetTasks;
  let mockSetState;
  let mockTasks;

  beforeEach(() => {
    mockSetTasks = jest.fn();
    mockSetState = jest.fn();
    mockTasks = [];
  });

  afterEach(() => {
    mockSetTasks.mockReset();
    mockSetState.mockReset();
    mockTasks = [];
  });

  test('Bottom Bar should render true', () => {
    render(
      <BottomBar
        setState={mockSetState}
        setTasks={mockSetTasks}
        tasks={mockTasks}
      />,
    );

    const Bottom = screen.root;
    expect(Bottom).toBeDefined();
  });

  test('Bottom bar should have input placeholder To do... and add button', () => {
    render(
      <BottomBar
        setState={mockSetState}
        setTasks={mockSetTasks}
        tasks={mockTasks}
      />,
    );

    const Bottom = screen.root;
    const Placeholder = getAllPlaceholderOf(Bottom);
    const AddText = getAllTextOf(Bottom);

    console.log(Placeholder, AddText);

    expect(Bottom).toHaveText('+');
    expect(Bottom).toHavePlaceholder('To do...');
  });

  test('Bottom bar should have true style', () => {
    render(
      <BottomBar
        setState={mockSetState}
        setTasks={mockSetTasks}
        tasks={mockTasks}
      />,
    );

    const Bottom = screen.root;
    const Child = getChildrenOf(Bottom)[0];
    const StyleOfBottom = getStyleOf(Bottom);
    const StyleOfChild = getStyleOf(Child);

    console.log(StyleOfBottom, StyleOfChild);

    expect(Bottom).toMatchStyle(TrueStyle);
    expect(Child).toMatchStyle(TrueStyleChild);
  });

  test('Bottom bar should have value if typing on text input', () => {
    jest.useFakeTimers();
    render(
      <BottomBar
        setState={mockSetState}
        setTasks={mockSetTasks}
        tasks={mockTasks}
      />,
    );

    const Bottom = screen.root;
    const TextInput = screen.getByPlaceholderText('To do...');

    fireEvent.changeText(TextInput, 'do exercise');

    const Value = getAllValueOf(Bottom);
    console.log(Value);

    expect(Bottom).toHaveValue('do exercise');
  });

  test('Add Button should disable when text input have not value', () => {
    render(
      <BottomBar
        setState={mockSetState}
        setTasks={mockSetTasks}
        tasks={mockTasks}
      />,
    );

    const AddButton = getParentOf(screen.getByText('+'));
    console.log(getEnabledInfo(AddButton));

    expect(AddButton).toBeDisable();

    fireEvent.press(AddButton);

    expect(mockSetState).not.toBeCalled();
    expect(mockSetTasks).not.toBeCalled();
  });

  test('Add Button should enable when text input have value', () => {
    jest.useFakeTimers();
    render(
      <BottomBar
        setState={mockSetState}
        setTasks={mockSetTasks}
        tasks={mockTasks}
      />,
    );

    const TextInput = screen.getByPlaceholderText('To do...');
    fireEvent.changeText(TextInput, 'do exercise');

    const AddButton = getParentOf(screen.getByText('+'));
    console.log(getEnabledInfo(AddButton));

    expect(AddButton).not.toBeDisable();

    fireEvent.press(AddButton);
    console.log(getEnabledInfo(AddButton));

    expect(AddButton).toBeDisable();
    expect(mockSetState).toBeCalled();
    expect(mockSetTasks).toBeCalledWith(TrueValue);
  });
});

expect.extend({
  toHaveText,
  toHavePlaceholder,
  toMatchStyle,
  toHaveValue,
  toBeDisable,
});
