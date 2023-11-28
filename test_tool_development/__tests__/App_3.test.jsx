import {fireEvent, render, screen} from '@testing-library/react-native';
import Login from '../src/components/Login/Login';
import {getAllParentOf} from '../src/test-tool/getAllInformation';
import {getChildrenOf, getValueOf} from '../src/test-tool/getInformation';
import {toHaveValue} from '../src/test-tool/toHaveInformation';

test('Test snapshot', async () => {
  const {toJSON} = render(<Login title="hell" />);
  console.log(toJSON());

  expect(toJSON()).toMatchSnapshot();
});

expect.extend({
  toHaveValue,
});
