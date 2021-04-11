import React, {Component} from 'react';
import AppNavigator from './src/navigations';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import persistedStore from './src/redux/store';
import HeaderHome from './src/components/HeaderHome';
import SplashScreen from 'react-native-splash-screen';

const {store, persistor} = persistedStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HeaderHome />
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
