import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: '60%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 10,
    color: '#176b87',
  },
});

function Input({style, ...props}) {
  return (
    <TextInput
      {...props}
      style={[styles.input, style]}
      placeholderTextColor={'#64CCC5'}
    />
  );
}

export default Input;
