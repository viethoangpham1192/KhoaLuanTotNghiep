import React from 'react';
import {Button, Text, TextInput, View, Switch} from 'react-native';

function Login(props) {
  const hello = true;
  const [account, setAccount] = React.useState('Account');
  const [password, setPassword] = React.useState('Password');
  const [isLogin, setIsLogin] = React.useState(false);

  const changeAccount = value => {
    setAccount(value);
  };

  const changePassword = value => {
    setPassword(value);
  };

  const clickLoginButton = () => {
    setIsLogin(true);
  };

  async function asyncClickLoginButton() {
    setTimeout(clickLoginButton, 5000);
  }

  return (
    <View testID="Component">
      <Text testID="title">{props.title}</Text>
      <Text>Account</Text>
      <TextInput
        style={{color: 'yellow'}}
        placeholder="Account"
        defaultValue={account}
        value={account}
        onChangeText={changeAccount}
      />
      <Text>Password</Text>
      <TextInput
        placeholder="Password"
        defaultValue={password}
        value={password}
        onChangeText={changePassword}
      />
      <Switch
        testID="switch"
        trackColor={{false: '#767577', true: '#81b0ff'}}
        style={{color: 'white'}}
        thumbColor={'#f5dd4b'}
        ios_backgroundColor="#3e3e3e"
      />
      <View>
        <Button
          testID="RealButton"
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
}

export default Login;
