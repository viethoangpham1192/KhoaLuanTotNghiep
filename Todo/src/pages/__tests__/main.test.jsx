import {fireEvent, render, screen, within} from '@testing-library/react-native';
import Main from '../main';
import {
  getStyleOf,
  getAllTextOf,
  toMatchStyle,
  getChildrenOf,
  getParentOf,
} from 'rntl-extend-lib';

const TrueStyle = {
  flex: 14,
};

const TrueStyleScroll = {
  height: '100%',
  width: '100%',
};

const UpdateTasks = [
  {
    id: 0,
    task: 'do exercise',
    done: true,
  },
  {
    id: 1,
    task: 'relax',
    done: false,
  },
  {
    id: 2,
    task: 'study english',
    done: true,
  },
];

describe('Main', () => {
  let mockState;
  let mockTasks;
  let mockSetState;
  let mockSetTasks;

  beforeEach(() => {
    mockState = '';
    mockTasks = [
      {
        id: 0,
        task: 'do exercise',
        done: true,
      },
      {
        id: 1,
        task: 'relax',
        done: false,
      },
      {
        id: 2,
        task: 'study english',
        done: true,
      },
      {
        id: 3,
        task: 'hang out',
        done: false,
      },
      {
        id: 4,
        task: 'cooking',
        done: false,
      },
      {
        id: 5,
        task: 'do home work',
        done: true,
      },
    ];
    mockSetState = jest.fn();
    mockSetTasks = jest.fn();
  });

  test('Main should render true', () => {
    render(
      <Main
        state={mockState}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const MainPage = screen.root;

    expect(MainPage).toBeDefined();
  });

  test('Style of main should be true style', () => {
    render(
      <Main
        state={mockState}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const MainPage = screen.root;
    const Scroll = getChildrenOf(MainPage)[0];
    const StyleOfMain = getStyleOf(MainPage);
    const StyleOfScroll = getStyleOf(Scroll);

    console.log('Style Of Main', StyleOfMain);
    console.log('Style Of Scroll', StyleOfScroll);

    expect(MainPage).toMatchStyle(TrueStyle);
    expect(Scroll).toMatchStyle(TrueStyleScroll);
  });

  test('Task component should action in Main component', () => {
    render(
      <Main
        state={mockState}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const RelaxText = screen.getByText('relax');
    const RelaxTask = getParentOf(RelaxText);
    const Done = within(RelaxTask).getByText('Done');
    const Delete = within(RelaxTask).getByText('Delete');

    console.log('Relax Text:', getAllTextOf(RelaxTask));

    fireEvent.press(Done);
    expect(mockSetState).toBeCalled();
    expect(mockSetTasks).toBeCalled();

    fireEvent.press(Delete);
    expect(mockSetState).toBeCalled();
    expect(mockSetTasks).toBeCalled();
  });

  test('Done component should action in Main component', () => {
    render(
      <Main
        state={mockState}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const StudyText = screen.getByText('study english');
    const StudyTask = getParentOf(StudyText);
    const Unfinished = within(StudyTask).getByText('Unfinished');

    console.log('Study Text:', getAllTextOf(StudyTask));

    fireEvent.press(Unfinished);
    expect(mockSetState).toBeCalled();
    expect(mockSetTasks).toBeCalled();
  });

  test('Main should change number of task when update component', () => {
    render(
      <Main
        state={mockState}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const TaskList = screen.getByTestId('TaskList');
    const NumberTaskBeforeUpdate = getChildrenOf(TaskList).length;

    console.log('Number Task Before Update:', NumberTaskBeforeUpdate);
    expect(NumberTaskBeforeUpdate).toBe(6);

    screen.update(
      <Main
        state={mockState}
        tasks={UpdateTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const NumberTaskAfterUpdateTasks = getChildrenOf(TaskList).length;
    console.log('Number Task After Update Tasks:', NumberTaskAfterUpdateTasks);
    expect(NumberTaskAfterUpdateTasks).toBe(6);

    screen.update(
      <Main
        state={Date.now()}
        tasks={UpdateTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const NumberTaskAfterUpdateAll = getChildrenOf(TaskList).length;
    console.log('Number Task After Update All:', NumberTaskAfterUpdateAll);
    expect(NumberTaskAfterUpdateAll).toBe(3);
  });
});

expect.extend({
  toMatchStyle,
});
