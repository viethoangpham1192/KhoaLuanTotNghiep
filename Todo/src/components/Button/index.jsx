import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  styleAddButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
  },
  styleAdd: {
    color: '#053b50',
    fontSize: 22,
  },
  styleAddDisabled: {
    color: '#a9b8bd',
    fontSize: 22,
  },
  styleButton: {
    flex: 1,
    justifyContent: 'center',
  },
});

export function AddButton({style, ...props}) {
  return (
    <TouchableOpacity style={[styles.styleAddButton, style]} {...props}>
      <Text style={props.disabled ? styles.styleAddDisabled : styles.styleAdd}>
        +
      </Text>
    </TouchableOpacity>
  );
}

export function TextButton({style, ...props}) {
  return (
    <TouchableOpacity style={[styles.styleButton, style]} {...props}>
      <Text>{props.children}</Text>
    </TouchableOpacity>
  );
}
