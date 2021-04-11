import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { theme } from '../../styles/ThemeColor';
import { Text } from '../../styles/Typography';

class FormInput extends Component {
  focusedInput = () => {
    this.textInput.setNativeProps({
      style: [styles.onFocus, styles.input]
    });
  };
  blurInput = () => {
    this.textInput.setNativeProps({
      style: [styles.onBlur, styles.input]
    });
  };

  render() {
    const { label } = this.props;
    return (
      <View style={styles.view}>
        <Text semibold size="16" mb="10" labelColor {...this.props}>
          {label}
        </Text>
        <TextInput
          {...this.props}
          ref={(c) => {
            this.textInput = c;
          }}
          style={[styles.onBlur, styles.input]}
          // onFocus={this.focusedInput}
          // onBlur={this.blurInput}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  onFocus: {
    borderColor: `${theme.primary}`
  },
  onBlur: {
    borderColor: `${theme.line}`
  },
  input: {
    fontFamily: 'Mulish-Regular',
    borderRadius: 12,
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  view: {
    marginVertical: 10
  }
});

export default FormInput;
