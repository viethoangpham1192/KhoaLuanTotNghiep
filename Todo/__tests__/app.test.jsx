import {fireEvent, render, screen, within} from '@testing-library/react-native';
import App from '../App';
import {
  getStyleOf,
  getAllTextOf,
  toMatchStyle,
  getChildrenOf,
  getParentOf,
  toHaveText,
  toBeDisable,
} from 'rntl-extend-lib';
const TrueStyle = {
  height: '100%',
  backgroundColor: '#eeeeee',
  justifyContent: 'space-between',
};

describe('App', () => {
  test('App should render true', () => {
    render(<App />);

    const Application = screen.root;

    expect(Application).toBeDefined();
  });

  test('Style Of App should be true style', () => {
    render(<App />);

    const Application = screen.root;
    const Style = getStyleOf(Application);

    console.log('Style', Style);
    expect(Application).toMatchStyle(TrueStyle);
  });

  test('App displays full text correctly ', () => {
    render(<App />);

    const Application = screen.root;
    const Text = getAllTextOf(Application);

    console.log('Text:', Text);
    expect(Application).toHaveText(['Todo', '+']);
  });

  test('Add Button should disable when text input have not value', () => {
    render(<App />);

    const Application = screen.root;
    const AddButton = getParentOf(screen.getByText('+'));

    fireEvent.press(AddButton);
    expect(Application).toHaveText(['Todo', '+']);
    expect(AddButton).toBeDisable();
  });

  test('Should App Run correctly', async () => {
    render(<App />);

    const Application = screen.root;
    let AddButton = getParentOf(screen.getByText('+'));
    let Input = screen.getByPlaceholderText('To do...');

    jest.useFakeTimers();
    fireEvent.changeText(Input, 'do exercise');
    fireEvent.press(AddButton);

    const TaskList = getChildrenOf(Application)[1];
    let AllTextOfTaskList = getAllTextOf(TaskList);

    console.log('All Text Of Task List:', AllTextOfTaskList);
    expect(TaskList).toHaveText(['do exercise', 'Done', 'Delete']);

    AddButton = getParentOf(screen.getByText('+'));
    Input = screen.getByPlaceholderText('To do...');

    jest.useFakeTimers();
    fireEvent.changeText(Input, 'relax');
    fireEvent.press(AddButton);

    jest.useFakeTimers();
    fireEvent.changeText(Input, 'study english');
    fireEvent.press(AddButton);

    jest.useFakeTimers();
    fireEvent.changeText(Input, 'hang out');
    fireEvent.press(AddButton);

    AllTextOfTaskList = getAllTextOf(TaskList);
    console.log('All Text Of Task List:', AllTextOfTaskList);

    expect(Application).toHaveText(['relax', 'study english', 'hang out']);

    let ExerciseTask = getParentOf(screen.getByText('do exercise'));
    const ExerciseDoneButton = within(ExerciseTask).getByText('Done');

    jest.useFakeTimers();
    fireEvent.press(ExerciseDoneButton);

    AllTextOfTaskList = getAllTextOf(TaskList);
    console.log('All Text Of Task List:', AllTextOfTaskList);

    const ExerciseDone = getParentOf(screen.getByText('do exercise'));
    expect(ExerciseDone).toHaveText('Unfinished');

    const ExerciseUnfinishedButton =
      within(ExerciseDone).getByText('Unfinished');

    jest.useFakeTimers();
    fireEvent.press(ExerciseUnfinishedButton);

    AllTextOfTaskList = getAllTextOf(TaskList);
    console.log('All Text Of Task List:', AllTextOfTaskList);

    ExerciseTask = getParentOf(screen.getByText('do exercise'));
    expect(ExerciseTask).toHaveText('Delete');
    const ExerciseDeleteButton = within(ExerciseTask).getByText('Delete');

    jest.useFakeTimers();
    fireEvent.press(ExerciseDeleteButton);

    AllTextOfTaskList = getAllTextOf(TaskList);
    console.log('All Text Of Task List:', AllTextOfTaskList);

    expect(Application).not.toHaveText('do exercise');
  });
});

expect.extend({
  toMatchStyle,
  toHaveText,
  toBeDisable,
});
