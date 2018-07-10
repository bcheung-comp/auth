import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD2IFB87-dPE9_p3nLceXUGQ7xD_N4_Vzk',
      authDomain: 'auth-comp.firebaseapp.com',
      databaseURL: 'https://auth-comp.firebaseio.com',
      projectId: 'auth-comp',
      storageBucket: 'auth-comp.appspot.com',
      messagingSenderId: '500798647963'
    });
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        <LoginForm />
      </View>
    );
  }
}

export default App;
