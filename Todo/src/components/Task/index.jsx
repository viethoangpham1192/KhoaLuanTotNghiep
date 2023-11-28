import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {TextButton} from '../Button';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 60,
    height: 'fit-content',
    width: '80%',
    borderRadius: 20,
    backgroundColor: '#64ccc5',
    marginTop: 15,
    alignItems: 'center',
  },
  content: {
    flex: 8,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#eeeeee',
    fontWeight: '700',
    fontSize: 14,
  },
  buttonGroup: {
    flex: 4,
    flexDirection: 'row',
  },
});

function Task(props) {
  function handelDone() {
    const arr = props.tasks;
    arr.forEach(db => {
      if (db.id === props.id) {
        db.done = true;
      }
    });
    props.setTasks(arr);
    props.setState(Date.now());
  }

  function handelDelete() {
    const arr = props.tasks.filter(db => db.id !== props.id);
    props.setTasks(arr);
    props.setState(Date.now());
    console.log(arr);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{props.task}</Text>
      <View style={styles.buttonGroup}>
        <TextButton onPress={handelDelete}>Delete</TextButton>
        <TextButton onPress={handelDone}>Done</TextButton>
      </View>
    </View>
  );
}

export default Task;
