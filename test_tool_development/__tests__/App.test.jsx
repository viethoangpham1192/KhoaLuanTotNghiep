import {render, screen} from '@testing-library/react-native';
import {TestComponent} from './TestComponent';
import {
  getAllTextOf,
  getAllPlaceholderOf,
  getAllValueOf,
  toHaveText,
} from 'rntl-extend-lib';

describe('test 1', () => {
  test('get all text of component', () => {
    render(<TestComponent />);

    const component = screen.root;
    const allTextOfComponent = getAllTextOf(component);
    const allInputOfComponent = getAllPlaceholderOf(component);
    const allValueOfComponent = getAllValueOf(component);
    console.log(allTextOfComponent, allInputOfComponent, allValueOfComponent);

    expect(component).toHaveText('Login');
  });
});

expect.extend({toHaveText});
