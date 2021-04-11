import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { Text } from '../styles/Typography';
import { Card, Container, Layout, Row } from '../styles/StyledComponent';
import { theme } from '../styles/ThemeColor';
import ButtonCustom from '../components/ButtonCustom';
import DropDownPicker from 'react-native-dropdown-picker';
import { sendSeatOrder } from '../redux/actions/order';
import { connect } from 'react-redux';
import OrderSeat from './OrderSeat';

class Seat extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={[
            seatStyles.component,
            this.props.selected && seatStyles.selected
          ]}
        />
      </TouchableOpacity>
    );
  }
}

const seatStyles = StyleSheet.create({
  component: {
    width: 15,
    height: 15,
    margin: 2,
    borderRadius: 2,
    backgroundColor: '#D6D8E7'
  },
  selected: {
    backgroundColor: '#5F2EEA'
  }
});

export class OrderPage extends Component {
  state = {
    selectedSeat: []
  };
  selectSeat = (id) => {
    const { selectedSeat } = this.state;
    console.log(id);
    this.setState({ selectedSeat: [...selectedSeat, ...[id]] }, () => {
      const { selectedSeat } = this.state;
      const getSeat = this.props.sendSeatOrder(selectedSeat);
      console.log(getSeat);
    });
  };
  render() {
    const chooseSeats = this.state.selectedSeat.join(', ');
    return (
      <ScrollView>
        <OrderSeat />

        <Container bgColor="transparent">
          <Text semibold size="18" mt="20">
            Choose Your Seat
          </Text>
          <Card border="white">
            {/* section 1 */}
            <View>
              <DividerScreen />
              <Row justify="space-between">
                <View>
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((col, i) => (
                    <Row>
                      {[1, 2, 3, 4, 5, 6, 7].map((row, id) => (
                        <Seat
                          selected={this.state.selectedSeat.includes(
                            `${col}${row}`
                          )}
                          onPress={() => this.selectSeat(`${col}${row}`)}
                        />
                      ))}
                    </Row>
                  ))}
                  <DividerSeat />
                </View>
                <View>
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((col, i) => (
                    <Row>
                      {[8, 9, 10, 11, 12, 13, 14].map((row, id) => (
                        <Seat
                          selected={this.state.selectedSeat.includes(
                            `${col}${row}`
                          )}
                          onPress={() => this.selectSeat(`${col}${row}`)}
                        />
                      ))}
                    </Row>
                  ))}
                  <DividerSeat />
                </View>
              </Row>
            </View>
            {/* section 2 */}
            <View>
              <Text semibold size="17" m="5px 0 10px 0">
                Seating key
              </Text>
              <Row>
                <FlexDesc>
                  <RowDesc>
                    <Icon name="arrow-down" color="#14142B" size={17} />
                    <TextDesc>A - G</TextDesc>
                  </RowDesc>
                  <RowDesc>
                    <SeatAvailable />
                    <TextDesc>Available</TextDesc>
                  </RowDesc>
                  <RowDesc>
                    <SeatLovenest />
                    <TextDesc>Love nest</TextDesc>
                  </RowDesc>
                </FlexDesc>
                <FlexDesc>
                  <RowDesc>
                    <Icon name="arrow-right" color="#14142B" size={17} />
                    <TextDesc>1 -14</TextDesc>
                  </RowDesc>
                  <RowDesc>
                    <SeatSelected />
                    <TextDesc>Selected</TextDesc>
                  </RowDesc>
                  <RowDesc>
                    <SeatSold />
                    <TextDesc>Sold</TextDesc>
                  </RowDesc>
                </FlexDesc>
              </Row>
            </View>
          </Card>
          {/* section 3 */}
          <Card mt="20" mb="20" border="white">
            <Row justify="space-between">
              <Text semibold size="16" style={{ flexWrap: 'wrap', flex: 1 }}>
                Choosed
              </Text>
              <Text
                semibold
                size="16"
                style={{ flexWrap: 'wrap', flex: 1, textAlign: 'right' }}>
                {chooseSeats}
              </Text>
            </Row>
          </Card>
          {/* section 4 */}
          <Card mb="20" border="white" elevation="3">
            <Row justify="space-between">
              <DropDownPicker
                items={[
                  {
                    label: 'USA',
                    value: 'usa'
                  },
                  {
                    label: 'UK',
                    value: 'uk'
                  },
                  {
                    label: 'France',
                    value: 'france'
                  }
                ]}
                defaultValue={this.state.date}
                containerStyle={{ height: 60 }}
                style={{
                  backgroundColor: '#EFF0F6',
                  minHeight: 48,
                  minWidth: '45%',
                  borderColor: 'white'
                }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={(item) =>
                  this.setState({
                    date: item.value
                  })
                }
              />
              <DropDownPicker
                items={[
                  {
                    label: 'USA',
                    value: 'usa',
                    hidden: true
                  },
                  {
                    label: 'UK',
                    value: 'uk'
                  },
                  {
                    label: 'France',
                    value: 'france'
                  }
                ]}
                placeholder=""
                defaultValue={this.state.location}
                containerStyle={{ height: 60 }}
                style={{
                  backgroundColor: '#EFF0F6',
                  minHeight: 48,
                  minWidth: '45%',
                  borderColor: 'white'
                }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={(item) =>
                  this.setState({
                    location: item.value
                  })
                }
              />
            </Row>
          </Card>
          {/* section 5 */}
          <ButtonCustom color="transparent" size="large" mb="50">
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

class SeatAvailable extends Component {
  render() {
    return <View style={styles.seatAvailable} />;
  }
}

class SeatLovenest extends Component {
  render() {
    return <View style={styles.seatLovenest} />;
  }
}

class SeatSelected extends Component {
  render() {
    return <View style={styles.seatSelected} />;
  }
}

class SeatSold extends Component {
  render() {
    return <View style={styles.seatSold} />;
  }
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 20,
    marginBottom: 5,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9570FE'
  },
  cardSeat: {
    borderRadius: 17,
    borderColor: 'white'
  },
  spaceSeat: {
    padding: 10
  },
  dividerSeat: {
    marginTop: 5,
    backgroundColor: '#ED2E7E'
  },
  seatAvailable: {
    width: 15,
    height: 15,
    borderRadius: 4,
    backgroundColor: '#D6D8E7'
  },
  seatLovenest: {
    width: 15,
    height: 15,
    borderRadius: 4,
    backgroundColor: '#F589D7'
  },
  seatSelected: {
    width: 15,
    height: 15,
    borderRadius: 4,
    backgroundColor: '#5F2EEA'
  },
  seatSold: {
    width: 15,
    height: 15,
    borderRadius: 4,
    backgroundColor: '#6E7171'
  },
  cardChoosed: {
    borderRadius: 16,
    marginTop: 30,
    borderColor: 'white'
  },
  cardSeatChoosed: {
    borderColor: 'white',
    borderRadius: 16,
    marginTop: 30,
    elevation: 4
  },
  select: {
    minWidth: '40%'
  }
});

const TextDesc = styled.Text`
  font-family: 'Mulish-Regular';
  margin-left: 10;
`;
const RowDesc = styled.View`
  flex-direction: row;
  margin-top: 5;
`;
const FlexDesc = styled.View`
  flex: 1;
`;
const DividerScreen = styled.View`
  height: 6px;
  background-color: #9570fe;
  border-radius: 3;
  margin-bottom: 10;
`;
const DividerSeat = styled.View`
  height: 1px;
  background-color: ${theme.error};
  margin-top: 5;
`;

const mapStateToProps = (state) => ({
  order: state.order
});

const mapDispatchToProps = { sendSeatOrder };

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
