import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Register from '../screens/Register';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import HomePage from '../screens/HomePage';
import MovieDetail from '../screens/MovieDetail';
import OrderSeat from '../screens/OrderSeat';
import PaymentPage from '../screens/PaymentPage';
import TicketResult from '../screens/TicketResult';
import ProfilePage from '../screens/ProfilePage';

import HeaderAuth from '../components/HeaderAuth';
import HeaderHome from '../components/HeaderHome';
import { connect } from 'react-redux';
import { login, autoLogin } from '../redux/actions/auth';

import { createDrawerNavigator } from '@react-navigation/drawer';
import ViewAll from '../screens/ViewAll';

const { Navigator, Screen } = createStackNavigator();
const Drawer = createDrawerNavigator();

class AppNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          {typeof this.props.auth.token === 'string' ? (
            <>
              <Drawer.Screen name="home-page" component={HomePage} />
              <Drawer.Screen name="movie-detail" component={MovieDetail} />
              <Drawer.Screen name="order-seat" component={OrderSeat} />
              <Drawer.Screen name="payment-page" component={PaymentPage} />
              <Drawer.Screen name="ticket-result" component={TicketResult} />
              <Drawer.Screen name="profile-page" component={ProfilePage} />
              <Drawer.Screen name="view-all" component={ViewAll} />
            </>
          ) : (
            <>
              <Screen
                options={{
                  header: () => <HeaderAuth />
                }}
                name="register"
                component={Register}
              />
              <Screen
                options={{
                  header: () => <HeaderAuth />
                }}
                name="login"
                component={Login}
              />
              <Screen
                options={{
                  header: () => <HeaderAuth />
                }}
                name="forgot-password"
                component={ForgotPassword}
              />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});
const mapDispatchToProps = { login, autoLogin };

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
