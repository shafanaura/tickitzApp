import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import styled from 'styled-components';
import {Text} from '../styles/Typography';
import {Card, Container, Layout, Row} from '../styles/StyledComponent';
import {theme} from '../styles/ThemeColor';
import ButtonCustom from '../components/ButtonCustom';
import {sendSeatOrder} from '../redux/actions/order';
import {connect} from 'react-redux';

const SEAT_FIRST_INDEX = 'A';
const SEAT_LAST_INDEX = 'G';
const SEAT_COUNT_PER_ROW = 7;
const SEAT_MARGIN = 2;
const SEAT_SIZE = 15;

export default class SeatSelector extends Component {
  constructor(props) {
    super(props);
    this.seatGenerator = this.seatGenerator.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.allSeat = this.allSeat.bind(this);
  }
  seatGenerator(first = 'A', last = 'G', count = 7, nextCount = false) {
    const firstChar = first.charCodeAt(0);
    const lastChar = last.charCodeAt(0);
    const seat = [];
    for (let i = firstChar; i <= lastChar; i++) {
      for (let j = 1; j <= count; j++) {
        seat.push(`${String.fromCharCode(i)}${nextCount ? count + j : j}`);
      }
    }
    return seat;
  }

  allSeat() {
    const seat = [];
    for (
      let i = SEAT_FIRST_INDEX.charCodeAt(0);
      i <= SEAT_LAST_INDEX.charCodeAt(0);
      i++
    ) {
      for (let j = 1; j <= SEAT_COUNT_PER_ROW * 2; j++) {
        seat.push(`${String.fromCharCode(i)}${j}`);
      }
    }
    return seat;
  }

  onSelect(seat) {
    this.props.onPress(seat);
    // this.props.availableSeat(this.availableSeat());
  }
  componentDidMount() {
    this.props.allSeat(this.allSeat());
  }
  render() {
    const seat = (next = false) =>
      this.seatGenerator(
        SEAT_FIRST_INDEX,
        SEAT_LAST_INDEX,
        SEAT_COUNT_PER_ROW,
        next,
      );
    const {selectedSeat, soldSeat} = this.props;
    return (
      <Card>
        <DividerScreen />
        <Row justify="space-between">
          <View>
            <View style={seatSelectorStyles.parent}>
              {seat().map(i => (
                <TouchableOpacity
                  onPress={() => this.onSelect(i)}
                  disabled={soldSeat.includes(i)}>
                  <View
                    style={[
                      seatSelectorStyles.seat,
                      selectedSeat.includes(i) &&
                        seatSelectorStyles.selectedSeat,
                      soldSeat.includes(i) && seatSelectorStyles.soldSeat,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <DividerSeat />
          </View>

          <View>
            <View style={seatSelectorStyles.parent}>
              {seat(true).map(i => (
                <TouchableOpacity
                  onPress={() => this.onSelect(i)}
                  disabled={soldSeat.includes(i)}>
                  <View
                    style={[
                      seatSelectorStyles.seat,
                      selectedSeat.includes(i) &&
                        seatSelectorStyles.selectedSeat,
                      soldSeat.includes(i) && seatSelectorStyles.soldSeat,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <DividerSeat />
          </View>
        </Row>
        {/* section 2 */}
        <View>
          <Text semibold size="17px" mt="10px">
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
    );
  }
}

const seatSelectorStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  parent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SEAT_COUNT_PER_ROW * (SEAT_SIZE + SEAT_MARGIN * 2),
  },
  seat: {
    margin: SEAT_MARGIN,
    width: SEAT_SIZE,
    height: SEAT_SIZE,
    backgroundColor: '#D6D8E7',
    borderRadius: 2,
  },
  selectedSeat: {
    backgroundColor: '#5F2EEA',
  },
  soldSeat: {
    backgroundColor: '#6E7191',
  },
});

const TextDesc = styled.Text`
  font-family: 'Mulish-Regular';
  margin-left: 10;
`;
const RowDesc = styled.View`
  flex-direction: row;
  margin-top: 5;
  flex: 1;
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
const SeatAvailable = styled.View`
  width: 15;
  height: 15;
  border-radius: 4;
  background-color: #d6d8e7;
`;
const SeatLovenest = styled.View`
  width: 15;
  height: 15;
  border-radius: 4;
  background-color: #f589d7;
`;
const SeatSelected = styled.View`
  width: 15;
  height: 15;
  border-radius: 4;
  background-color: #5f2eea;
`;
const SeatSold = styled.View`
  width: 15;
  height: 15;
  border-radius: 4;
  background-color: #6e7171;
`;
