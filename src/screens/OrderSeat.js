import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';

import SeatSelector from '../components/SeatSelector';
import SeatPicker from '../components/SeatPicker';
import { Card, Container, Row } from '../styles/StyledComponent';
import { Text } from '../styles/Typography';
import ButtonCustom from '../components/ButtonCustom';
import Footer from '../components/Footer';
import { sendSeatOrder } from '../redux/actions/order';
import { connect } from 'react-redux';

class OrderSeat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeat: [],
      soldSeat: [],
      availableSeat: [],
      allSeat: []
    };
    this.selectSeat = this.selectSeat.bind(this);
    this.checkAvailableSeat = this.checkAvailableSeat.bind(this);
    this.seatPick = this.seatPick.bind(this);
  }
  selectSeat(seatNum) {
    const { selectedSeat } = this.state;
    this.setState(
      {
        selectedSeat: selectedSeat.includes(seatNum)
          ? selectedSeat.filter((seat) => seat !== seatNum)
          : [...selectedSeat, seatNum]
      },
      () => {
        this.setState({ availableSeat: this.checkAvailableSeat() });
      }
    );
  }
  checkAvailableSeat() {
    const { selectedSeat, allSeat } = this.state;
    return allSeat.filter((current) => !selectedSeat.includes(current));
  }
  seatPick(oldSeat, newSeat) {
    const { selectedSeat, soldSeat } = this.state;
    if (!soldSeat.includes(newSeat)) {
      if (selectedSeat.indexOf(newSeat) === -1) {
        const indexSeat = selectedSeat.indexOf(oldSeat);
        selectedSeat[indexSeat] = newSeat;
        this.setState({ selectedSeat });
      } else {
        Alert.alert(
          'Seat has been selected before, please select another seat!'
        );
      }
    } else {
      Alert.alert('Your seat has been reserved!');
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedSeat !== prevState.selectedSeat) {
      const getSeat = this.props.sendSeatOrder(this.state.selectedSeat);
      console.log(getSeat);
    }
  }
  render() {
    const { selectedSeat, soldSeat } = this.state;
    return (
      <ScrollView>
        <Container bgColor="transparent">
          <Text semibold size="18px" mt="20px" mb="20px">
            Choose Your Seat
          </Text>
          <SeatSelector
            onPress={this.selectSeat}
            selectedSeat={selectedSeat}
            soldSeat={soldSeat}
            allSeat={(allSeat) => this.setState({ allSeat })}
          />
          <Card mt="20" mb="20" border="white">
            <Row justify="space-between">
              <Text semibold size="16" style={{ flexWrap: 'wrap', flex: 1 }}>
                Choosed
              </Text>
              <Text
                semibold
                size="16"
                style={{
                  flexWrap: 'wrap',
                  flex: 1,
                  textAlign: 'right'
                }}>
                {selectedSeat.join(', ')}
              </Text>
            </Row>
          </Card>
          <Card mb="20" border="white" elevation="3">
            {selectedSeat.map((seat) => (
              <SeatPicker
                onChange={(newSeat) => this.seatPick(seat, newSeat)}
                selected={seat}
                allSeat={this.state.allSeat}
              />
            ))}
          </Card>
          <ButtonCustom color="transparent" size="large" mt="10px" mb="50">
            <Text primary semibold>
              Add new seat
            </Text>
          </ButtonCustom>
          <ButtonCustom
            size="large"
            mb="20"
            onPress={() => this.props.navigation.navigate('payment-page')}>
            <Text white semibold>
              Checkout now
            </Text>
          </ButtonCustom>
        </Container>
        <Container>
          <Footer />
        </Container>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order
});

const mapDispatchToProps = { sendSeatOrder };

export default connect(mapStateToProps, mapDispatchToProps)(OrderSeat);
