import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextButton} from '../Button';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    width: '80%',
    borderRadius: 20,
    backgroundColor: '#a8cc64',
    marginTop: 15,
    alignItems: 'center',
  },
  content: {
    flex: 8,
    paddingLeft: 20,
    color: '#eeeeee',
    fontWeight: '700',
    fontSize: 14,
  },
  buttonGroup: {
    flex: 4,
    flexDirection: 'row',
  },
});

function Done(props) {
  function handelUnfinished() {
    const arr = props.tasks;
    arr.forEach(db => {
      if (db.id === props.id) {
        db.done = false;
      }
    });
    props.setTasks(arr);
    props.setState(Date.now());
  }

  return (
    <View style={styles.container}>
      <Text style={styles.content}>{props.task}</Text>
      <View style={styles.buttonGroup}>
        <TextButton onPress={handelUnfinished}>Unfinished</TextButton>
      </View>
    </View>
  );
}

export default Done;
