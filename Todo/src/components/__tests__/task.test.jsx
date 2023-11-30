import {fireEvent, render, screen} from '@testing-library/react-native';
import {
  getStyleOf,
  getAllTextOf,
  toHaveText,
  toMatchStyle,
  getChildrenOf,
} from 'rntl-extend-lib';
import Task from '../Task';

const TrueStyle = {
  flexDirection: 'row',
  minHeight: 60,
  height: 'fit-content',
  width: '80%',
  borderRadius: 20,
  backgroundColor: '#64ccc5',
  marginTop: 15,
  alignItems: 'center',
};

const TrueStyleChildSt = {
  flex: 8,
  paddingLeft: 20,
  paddingTop: 10,
  paddingBottom: 10,
  color: '#eeeeee',
  fontWeight: '700',
  fontSize: 14,
};

const TrueStyleChildNd = {
  flex: 4,
  flexDirection: 'row',
};

const TrueValueDone = [
  {
    id: 0,
    task: 'do exercise',
    done: false,
  },
  {
    id: 1,
    task: 'relax',
    done: true,
  },
  {
    id: 2,
    task: 'study english',
    done: false,
  },
];
const TrueValueDelete = [
  {
    id: 0,
    task: 'do exercise',
    done: false,
  },
  {
    id: 2,
    task: 'study english',
    done: false,
  },
];

describe('Task', () => {
  let mockId;
  let mockTask;
  let mockTasks;
  let mockSetTasks;
  let mockSetState;

  beforeEach(() => {
    mockId = 1;
    mockTask = 'relax';
    mockTasks = [
      {
        id: 0,
        task: 'do exercise',
        done: false,
      },
      {
        id: 1,
        task: 'relax',
        done: false,
      },
      {
        id: 2,
        task: 'study english',
        done: false,
      },
    ];
    mockSetTasks = jest.fn();
    mockSetState = jest.fn();
  });

  afterEach(() => {
    mockId = null;
    mockTask = null;
    mockTasks = [];
    mockSetTasks.mockReset();
    mockSetState.mockReset();
  });

  test('Task render true', () => {
    render(
      <Task
        id={mockId}
        task={mockTask}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const TaskToDo = screen.root;
    expect(TaskToDo).toBeDefined();
  });

  test('Task component displays full text correctly', () => {
    render(
      <Task
        id={mockId}
        task={mockTask}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const TaskToDo = screen.root;
    const AllTextOfTask = getAllTextOf(TaskToDo);

    console.log(AllTextOfTask);

    expect(TaskToDo).toHaveText(['relax', 'Delete', 'Done']);
  });

  test('Style of task have true style', () => {
    render(
      <Task
        id={mockId}
        task={mockTask}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const TaskToDo = screen.root;
    const ChildSt = getChildrenOf(TaskToDo)[0];
    const ChildNd = getChildrenOf(TaskToDo)[1];

    const StyleOfTask = getStyleOf(TaskToDo);
    const StyleOfSt = getStyleOf(ChildSt);
    const StyleOfNd = getStyleOf(ChildNd);

    console.log('Style Of Parent:', StyleOfTask);
    console.log('Style Of ChildSt:', StyleOfSt);
    console.log('Style Of ChildNd:', StyleOfNd);

    expect(TaskToDo).toMatchStyle(TrueStyle);
    expect(ChildSt).toMatchStyle(TrueStyleChildSt);
    expect(ChildNd).toMatchStyle(TrueStyleChildNd);
  });

  test('Task component should action when on press Done button', () => {
    render(
      <Task
        id={mockId}
        task={mockTask}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const DoneButton = screen.getByText('Done');
    fireEvent.press(DoneButton);

    expect(mockSetState).toBeCalled();
    expect(mockSetTasks).toBeCalledWith(TrueValueDone);
  });

  test('Task component should action when on press Delete button', () => {
    render(
      <Task
        id={mockId}
        task={mockTask}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const DeleteButton = screen.getByText('Delete');
    fireEvent.press(DeleteButton);

    expect(mockSetState).toBeCalled();
    expect(mockSetTasks).toBeCalledWith(TrueValueDelete);
  });
});

expect.extend({
  toHaveText,
  toMatchStyle,
});
