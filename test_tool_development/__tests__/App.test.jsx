import {render, screen} from '@testing-library/react-native';
import Login from '../src/components/Login/Login';
import {
  getAllTextOf,
  getAllPlaceholderOf,
  getAllValueOf,
  toHaveText,
  getEnabledInfo,
} from './../rntl-extend';

describe('test 1', () => {
  test('get all text of component', () => {
    render(<Login title="hello" />);

    const component = screen.root;
    // const allTextOfComponent = getAllTextOf(component);
    // const allInputOfComponent = getAllPlaceholderOf(component);
    // const allValueOfComponent = getAllValueOf(component);
    console.log(getEnabledInfo(component));

    expect(component).toHaveText('hello');
  });
});

expect.extend({toHaveText});
