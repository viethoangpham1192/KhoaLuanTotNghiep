import {fireEvent, render, screen} from '@testing-library/react-native';
import {
  getStyleOf,
  getAllTextOf,
  toHaveText,
  toMatchStyle,
  getChildrenOf,
} from 'rntl-extend-lib';
import Done from '../Done';

const TrueStyle = {
  flexDirection: 'row',
  minHeight: 60,
  height: 'fit-content',
  width: '80%',
  borderRadius: 20,
  backgroundColor: '#a8cc64',
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

const TrueValueUnfinished = [
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

describe('Done', () => {
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
        done: true,
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

  test('Done render true', () => {
    render(
      <Done
        id={mockId}
        task={mockTask}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const DoneTask = screen.root;
    expect(DoneTask).toBeDefined();
  });

  test('Done component displays full text correctly', () => {
    render(
      <Done
        id={mockId}
        task={mockTask}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const DoneTask = screen.root;
    const AllTextOfDone = getAllTextOf(DoneTask);

    console.log(AllTextOfDone);

    expect(DoneTask).toHaveText(['relax', 'Unfinished']);
  });

  test('Style of Done have true style', () => {
    render(
      <Done
        id={mockId}
        task={mockTask}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const DoneTask = screen.root;
    const ChildSt = getChildrenOf(DoneTask)[0];
    const ChildNd = getChildrenOf(DoneTask)[1];

    const StyleOfDone = getStyleOf(DoneTask);
    const StyleOfSt = getStyleOf(ChildSt);
    const StyleOfNd = getStyleOf(ChildNd);

    console.log('Style Of Parent:', StyleOfDone);
    console.log('Style Of ChildSt:', StyleOfSt);
    console.log('Style Of ChildNd:', StyleOfNd);

    expect(DoneTask).toMatchStyle(TrueStyle);
    expect(ChildSt).toMatchStyle(TrueStyleChildSt);
    expect(ChildNd).toMatchStyle(TrueStyleChildNd);
  });

  test('Done action when on press Unfinished button', () => {
    render(
      <Done
        id={mockId}
        task={mockTask}
        tasks={mockTasks}
        setState={mockSetState}
        setTasks={mockSetTasks}
      />,
    );

    const UnfinishedButton = screen.getByText('Unfinished');
    fireEvent.press(UnfinishedButton);

    expect(mockSetState).toBeCalled();
    expect(mockSetTasks).toBeCalledWith(TrueValueUnfinished);
  });
});

expect.extend({
  toHaveText,
  toMatchStyle,
});
