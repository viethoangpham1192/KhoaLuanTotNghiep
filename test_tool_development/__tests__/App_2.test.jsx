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
