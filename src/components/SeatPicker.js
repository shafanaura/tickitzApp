import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { theme } from '../styles/ThemeColor';

export default class SeatPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeat: this.props.selected
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(val, idx) {
    let selectedAlphabet = this.props.selected[0];
    let selectedNum = this.props.selected.slice(1);
    if (parseInt(val, 10)) {
      selectedNum = val;
    } else {
      selectedAlphabet = val;
    }
    this.props.onChange(`${selectedAlphabet}${selectedNum}`);
  }
  render() {
    const onlyAlphabet = Array.from(
      new Set(this.props.allSeat.map((seat) => seat[0]))
    );
    const onlyNum = Array.from(
      new Set(this.props.allSeat.map((seat) => seat.slice(1)))
    );

    const selectedAlphabet = this.props.selected[0];
    const selectedNum = this.props.selected.slice(1);

    return (
      <View style={pickerStyles.pickerParent}>
        <View style={pickerStyles.pickerWrapper}>
          <Picker
            onValueChange={this.onChange}
            selectedValue={selectedAlphabet}
            style={pickerStyles.picker}>
            {onlyAlphabet.map((item) => (
              <Picker.Item label={item} value={item} />
            ))}
          </Picker>
        </View>

        <View style={pickerStyles.pickerWrapper}>
          <Picker
            onValueChange={this.onChange}
            selectedValue={selectedNum}
            style={pickerStyles.picker}>
            {onlyNum.map((item) => (
              <Picker.Item label={item} value={item} />
            ))}
          </Picker>
        </View>
      </View>
    );
  }
}

const pickerStyles = StyleSheet.create({
  pickerParent: {
    flexDirection: 'row'
  },
  pickerWrapper: {
    flex: 1,
    height: 50,
    backgroundColor: `${theme.inputbg}`,
    borderRadius: 5,
    margin: 10,
    padding: 10
  },
  picker: {
    flex: 1
  }
});
