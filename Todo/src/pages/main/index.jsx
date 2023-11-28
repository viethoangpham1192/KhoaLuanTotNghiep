import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import Task from '../../components/Task';
import Done from '../../components/Done';

const styles = StyleSheet.create({
  container: {
    flex: 14,
  },
  scroll: {
    height: '100%',
    width: '100%',
  },
});

function Main(props) {
  const [doneList, setDoneList] = React.useState([]);
  const [unfinishedList, setUnfinishedList] = React.useState([]);

  function getTasks() {
    const done = [];
    const unfinished = [];

    props.tasks.forEach(doc => {
      if (doc.done === true) {
        done.push({id: doc.id, task: doc.task});
      } else {
        unfinished.push({id: doc.id, task: doc.task});
      }
    });

    setDoneList(done);
    setUnfinishedList(unfinished);
  }

  React.useEffect(() => {
    getTasks();
  }, [props.state]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={{alignItems: 'center'}}>
          {unfinishedList.map(db => (
            <Task
              task={db.task}
              key={db.id}
              id={db.id}
              setState={props.setState}
              setTasks={props.setTasks}
              tasks={props.tasks}
            />
          ))}
          {doneList.map(db => (
            <Done
              task={db.task}
              key={db.id}
              id={db.id}
              setState={props.setState}
              setTasks={props.setTasks}
              tasks={props.tasks}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Main;
