import React, { Component } from 'react';
import {
  TextInput,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../../styles/ThemeColor';
import { Text } from '../../styles/Typography';

export default class FormPassword extends Component {
  state = {
    hidePassword: true
  };

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  render() {
    return (
      <View>
        <Text semibold size="16" mb="10" labelColor {...this.props}>
          {this.props.label}
        </Text>
        <View style={styles.container}>
          <View style={styles.textBoxBtnHolder}>
            <TextInput
              {...this.props}
              placeholder={this.props.placeholder}
              secureTextEntry={this.state.hidePassword}
              style={styles.textBox}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.visibilityBtn}
              onPress={this.managePasswordVisibility}>
              {this.state.hidePassword ? (
                <Icon size={23} name="eye-off" color={theme.label} />
              ) : (
                <Icon size={23} name="eye" color={theme.label} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textBoxBtnHolder: {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1
  },

  textBox: {
    fontFamily: 'Mulish-Regular',
    alignSelf: 'stretch',
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: `${theme.line}`,
    borderRadius: 12
  },

  visibilityBtn: {
    position: 'absolute',
    right: 25
  },

  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  }
});
