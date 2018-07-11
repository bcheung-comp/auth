import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

class App extends Component {
  constructor(props) {
    super(props);

    // Bind the this context to the handler function
    this.handler = this.handler.bind(this);

    // Set some state
    this.state = {
        register: false
    };
  }

  state = { loggedIn: null, register: false };
  
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD2IFB87-dPE9_p3nLceXUGQ7xD_N4_Vzk',
      authDomain: 'auth-comp.firebaseapp.com',
      databaseURL: 'https://auth-comp.firebaseio.com',
      projectId: 'auth-comp',
      storageBucket: 'auth-comp.appspot.com',
      messagingSenderId: '500798647963'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false, register: false });
      }
    });
  }

  handler() {
    this.setState({
        register: true
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
            </CardSection>
          </Card>
        );
      case false:
        if (this.state.register) {
          return <RegisterForm />;
        }
        return <LoginForm onCreateAccountPress={this.handler} />;
      default:
        return (
          <View>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
