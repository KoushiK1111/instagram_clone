import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBlT4kgkDGZXuFvylwkcC_9Rc9fRF_g6nk",
  authDomain: "instagram-6e525.firebaseapp.com",
  projectId: "instagram-6e525",
  storageBucket: "instagram-6e525.appspot.com",
  messagingSenderId: "278985640921",
  appId: "1:278985640921:web:0ab64f2c38578b4f8827c8",
  measurementId: "G-Y0NMHPDMSB"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ experimentalForceLongPolling: true });
}

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import HomeNavigation from './src/navigation/HomeNavigation';
import Navigation from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import store from './src/redux/Store';

const App = () => {
  const [logged, setLogged] = useState();
  const [loaded, setLoaded] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        setLogged(false)
        setLoaded(false)
      } else {
        setLogged(true)
        setLoaded(false)
      }
    })
  }, []);
  if (loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color="black" />
      </View>
    );
  } else if (!logged) {
    return (
      <Navigation />
    );
  } else {
    return (
      <Provider store = {store}>
        <HomeNavigation />
      </Provider>
    )
  }

}

export default App;