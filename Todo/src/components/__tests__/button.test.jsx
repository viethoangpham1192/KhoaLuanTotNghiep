import {fireEvent, render, screen} from '@testing-library/react-native';
import {AddButton} from '../Button';
import Header from '../Header';
// import { getStyleOf } from "rntl-extend-lib";

describe('test add button', () => {
  const mockPress = jest.fn();

  test('add button', () => {
    render(<Header />);

    // const Button = screen.root;
    // const StyleOfButton = getStyleOf(Button);

    // console.log(StyleOfButton);

    // fireEvent.press(Button);

    expect(screen.root).toBeTruthy();
  });
});
