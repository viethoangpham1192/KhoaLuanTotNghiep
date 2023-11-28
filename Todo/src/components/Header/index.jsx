import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  content: {
    lineHeight: 80,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#053b50',
  },
});

function Header(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{props.title}</Text>
    </View>
  );
}

export default Header;
