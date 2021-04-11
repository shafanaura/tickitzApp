import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { Text } from '../styles/Typography';
import ButtonCustom from './ButtonCustom';
import { logout } from '../redux/actions/auth';
import { connect } from 'react-redux';

export class LogoutButton extends Component {
  logout = () => {
    const getLogout = this.props.logout();
    {
      getLogout
        ? Alert.alert('Succes to Logout')
        : Alert.alert('Failed to logout');
    }
  };
  render() {
    return (
      <ButtonCustom onPress={this.logout}>
        <Text white>Logout</Text>
      </ButtonCustom>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});
const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
