import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { FIREBASE_CONFIG } from './FirebaseConfig';

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
    firebase.initializeApp(FIREBASE_CONFIG);
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
