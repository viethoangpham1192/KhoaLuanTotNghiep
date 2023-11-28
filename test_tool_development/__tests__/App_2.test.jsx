import Add from './Math.js';

describe('Add function', () => {
  let result;

  // Arrange (Sắp xếp): Chuẩn bị môi trường kiểm tra
  beforeEach(() => {
    result = 0;
  });

  test('should add two numbers correctly', () => {
    // Act (Hành động): Gọi hàm add
    result = Add(2, 3);

    // Assert (Khẳng định): Kiểm tra kết quả
    expect(result).toBe(5);
  });

  test('should handle zero correctly', () => {
    // Act (Hành động): Gọi hàm add
    result = add(0, 3);

    // Assert (Khẳng định): Kiểm tra kết quả
    expect(result).toBe(3);
  });

  // CleanUp: Dọn sạch sau mỗi bài kiểm tra
  afterEach(() => {
    result = 0;
  });
});

import Component from './Component.jsx';
import {fireEvent, render} from '@testing-library/react-native';

describe('test Component', () => {
  test('Test button login', () => {
    //render Component
    const {getByText} = render(<Component />);

    //tìm kiếm Login Button với 'login'
    const LoginButton = getByText('Login');

    //nhấn Login Button
    fireEvent.press(LoginButton);

    //tìm kiếm login status với 'Logged in successfully'
    const LoginStatus = getByText('Logged in successfully');

    //kiểm tra xem trạng thái 'Logged in successfully' có tồn tại hay không
    expect(LoginStatus).toBeDefined();
  });
});
