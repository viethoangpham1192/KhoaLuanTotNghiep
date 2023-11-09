import React from 'react';
import {View, Text, Button} from 'react-native';

const Hello = () => {
  const message = 'Hello, React Native!';
  const [count, setCount] = React.useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  return (
    <View>
      <Text>Functional Component</Text>
      <Text>Count: {count}</Text>
      <Button title="Increase Count" onPress={increaseCount} />
      <Text>{message}</Text>
    </View>
  );
};

export default Hello;
