import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });
    // must bind context since function passed into a promise
    // that will be invoked in the future
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFailed.bind(this));
      });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
  }

  onLoginFailed() {
    this.setState({
      email: '',
      password: '',
      error: 'Authentication Failed.',
      loading: false
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@gmail.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Password"
            placeholder="password"
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
