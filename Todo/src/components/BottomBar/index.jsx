import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Input from '../Input';
import {AddButton} from '../Button';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    height: 'fit-content',
    width: '100%',
  },
  box: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#053b50',
  },
});

function BottomBar(props) {
  const [state, setState] = React.useState('');
  const writeTask = text => {
    setState(text);
  };

  function storeTask() {
    if (state != '') {
      const arr = props.tasks;
      const length = arr.length;
      const id = length;
      arr.push({done: false, id: id, task: state});
      props.setTasks(arr);
      props.setState(Date.now());
    }
    setState('');
  }
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>{state}</Text>
        <Input
          placeholder="To do..."
          maxLength={200}
          onChangeText={text => {
            writeTask(text);
          }}
          value={state}
        />
        <AddButton onPress={storeTask} disabled={state === ''} />
      </View>
    </View>
  );
}

export default BottomBar;
