import {fireEvent, render, screen, within} from '@testing-library/react-native';
import List from '../List';
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

describe('List', () => {
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

  test('List should render true', () => {
    render(
      <List
        state={mockState}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const ListPage = screen.root;

    expect(ListPage).toBeDefined();
  });

  test('Style of List should be true style', () => {
    render(
      <List
        state={mockState}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const ListPage = screen.root;
    const Scroll = getChildrenOf(ListPage)[0];
    const StyleOfList = getStyleOf(ListPage);
    const StyleOfScroll = getStyleOf(Scroll);

    console.log('Style Of List', StyleOfList);
    console.log('Style Of Scroll', StyleOfScroll);

    expect(ListPage).toMatchStyle(TrueStyle);
    expect(Scroll).toMatchStyle(TrueStyleScroll);
  });

  test('Task component should work correctly in List component', () => {
    render(
      <List
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

  test('Done Component should work correctly in List Component', () => {
    render(
      <List
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

  test('List should change number of task when update component', () => {
    render(
      <List
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
      <List
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
      <List
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
