import {render, screen} from '@testing-library/react-native';
import Header from '../Header';
import {
  getAllTextOf,
  toHaveText,
  getStyleOf,
  toMatchStyle,
  getChildrenOf,
  getTypeOf,
} from 'rntl-extend-lib';

const TrueStyle = {
  justifyContent: 'space-between',
};

const TrueStyleChild = {
  lineHeight: 80,
  textAlign: 'center',
  fontSize: 22,
  fontWeight: '700',
  color: '#053b50',
};

describe('Header', () => {
  test('Header should render true', () => {
    render(<Header title={'To Do'} />);

    const HeaderBar = screen.root;
    expect(HeaderBar).toBeDefined();
  });

  test('Title should be true', () => {
    render(<Header title={'To Do'} />);

    const HeaderBar = screen.root;
    const Title = getAllTextOf(HeaderBar);

    console.log('Title:', Title);
    expect(HeaderBar).toHaveText('To Do');
  });

  test('Style of header should be true style', () => {
    render(<Header title={'To Do'} />);

    const HeaderBar = screen.root;
    const Style = getStyleOf(HeaderBar);

    console.log('Style Of Header:', Style);
    expect(HeaderBar).toMatchStyle(TrueStyle);
  });

  test('Style of child should be true style', () => {
    render(<Header title={'To Do'} />);

    const HeaderBar = screen.root;
    const Child = getChildrenOf(HeaderBar)[0];
    const TypeOfChild = getTypeOf(Child);
    const Style = getStyleOf(Child);

    console.log('Type Of Child:', TypeOfChild);
    console.log('Style Of Child:', Style);

    expect(Child).toMatchStyle(TrueStyleChild);
  });
});

expect.extend({
  toHaveText,
  toMatchStyle,
});
