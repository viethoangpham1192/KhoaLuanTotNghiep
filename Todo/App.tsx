import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './src/components/Header';
import List from './src/pages/List';
import BottomBar from './src/components/BottomBar';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#eeeeee',
    justifyContent: 'space-between',
  },
});

function App() {
  const [state, setState] = React.useState('');
  const [tasks, setTasks] = React.useState([]);
  return (
    <View style={styles.container}>
      <Header title={'Todo'} />
      <List
        state={state}
        setState={setState}
        tasks={tasks}
        setTasks={setTasks}
      />
      <BottomBar setState={setState} tasks={tasks} setTasks={setTasks} />
    </View>
  );
}

export default App;
