import {render} from '@testing-library/react-native';
import Login from '../src/components/Login/Login';
import {getAllParentOf} from '../src/test-tool/getAllInformation';
import {getChildrenOf} from '../src/test-tool/getInformation';

test('Test get all children', async () => {
  const {getByTestId} = render(<Login title="hello" />);
  const component = getByTestId('RealButton');
  const children = getAllParentOf(component);
  console.log(children);
});

// expect.extend({
//     getChildrenOf
// });
