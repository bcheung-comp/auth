import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class RegisterForm extends Component {
  state = { email: '', password: '', confirmPassword: '', error: '', loading: '' };

  onRegisterPress() {
    const { email, password, confirmPassword } = this.state;

    this.setState({ error: '', loading: true });
    // must bind context since function passed into a promise
    // that will be invoked in the future
    if (password === confirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(this.onRegisterSuccess.bind(this))
        .catch(this.onRegisterFailed.bind(this));
    } else {
      this.setState({
        password: '',
        confirmPassword: '',
        error: 'Passwords do not match.',
        loading: false
      });
    }
  }

  onRegisterSuccess() {
    this.setState({
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      loading: false
    });
  }

  onRegisterFailed() {
    this.setState({
      email: '',
      password: '',
      confirmPassword: '',
      error: 'Authentication Failed.',
      loading: false
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return <Button onPress={this.onRegisterPress.bind(this)}>Register</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@email.com"
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
        <CardSection>
          <Input
            label="Confirm Password"
            placeholder="re-enter password"
            secureTextEntry
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
          />
        </CardSection>

        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        </View>

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

export default RegisterForm;
