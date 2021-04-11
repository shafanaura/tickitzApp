import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Footer from '../components/Footer';
import Spider from '../assets/images/movies/spiderman.jpg';
import Icon from 'react-native-vector-icons/Feather';
import cinema from '../assets/images/cinemas/hiflix.png';
import {
  Card,
  Center,
  Container,
  Layout,
  Row
} from '../styles/StyledComponent';
import { Text } from '../styles/Typography';
import ButtonCustom from '../components/ButtonCustom';
import styled from 'styled-components';
import { theme } from '../styles/ThemeColor';
import DropDownPicker from 'react-native-dropdown-picker';
import { getShowTime } from '../redux/actions/showtime';
import { getMovieDetail } from '../redux/actions/movie';
import { createOrder } from '../redux/actions/order';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import listShowTime from '../utils/listShowTime';
import { Picker } from '@react-native-picker/picker';
import listCity from '../utils/listCity';
import listDate from '../utils/listDate';
import http from '../helpers/http';

const MapIcon = (props) => (
  <Icon {...props} color="#4E4B66" size={20} name="map-pin" />
);
const CalendarIcon = (props) => (
  <Icon {...props} color="#4E4B66" size={20} name="calendar" />
);

export class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: '',
      movie: {},
      showResults: [],
      showLocDate: [],
      selectedTime: '',
      selectedDate: '',
      selectedLocation: ''
    };
  }
  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.selectedLocation !== prevState.selectedLocation ||
      this.state.selectedDate !== prevState.selectedDate
    ) {
      const data = new URLSearchParams();
      const { getItem } = this.props.route.params;
      data.append('date', this.state.selectedDate);
      data.append('location', this.state.selectedLocation);
      data.append('movie', getItem.id);
      const response = await http().get(`showtimes?${data.toString()}`);
      this.setState({
        showResults: response.data.results
      });
    }
  }
  sendOrder = () => {
    const { getItem } = this.props.route.params;
    const getTime = this.state.selectedTime;
    const getLocation = this.state.selectedLocation;
    const getDate = this.state.selectedDate;
    const getOrder = this.props.createOrder(
      getLocation,
      getDate,
      getTime,
      getItem
    );
    console.log(getOrder);
    this.props.navigation.navigate('order-seat');
  };
  render() {
    const { getItem } = this.props.route.params;
    console.log(this.state.selectedLocation);
    console.log(this.state.selectedDate);
    console.log(this.state.selectedTime);
    return (
      <Layout>
        <Container>
          <ScrollView>
            {/* section 1 */}
            <Center>
              <Card>
                <Image source={{ uri: getItem.picture }} />
              </Card>
              <Text semibold size="20" mt="10">
                {getItem.title}
              </Text>
              <Text light size="16" mb="20">
                {getItem.genre}
              </Text>
            </Center>
            {/* section 2 */}
            <Row>
              <WrapperDesc>
                <View>
                  <Text light size="12" mt="10">
                    Directed by
                  </Text>
                  <Text light size="16">
                    {getItem.directed}
                  </Text>
                </View>
                <View>
                  <Text light size="12" mt="10">
                    Casts
                  </Text>
                  <Text light size="16">
                    {getItem.cast}
                  </Text>
                </View>
              </WrapperDesc>
              <WrapperDesc>
                <View>
                  <Text light size="12" mt="10">
                    Release date
                  </Text>
                  <Text light size="16">
                    {moment(getItem.releaseDate).format('D MMMM YYYY')}
                  </Text>
                </View>
                <View>
                  <Text light size="12" mt="10">
                    Duration
                  </Text>
                  <Text light size="16">
                    {moment.duration(getItem.duration).format('h[h] m [min]')}
                  </Text>
                </View>
              </WrapperDesc>
            </Row>
            {/* section 3 */}
            <View>
              <Text semibold size="16" mb="10" mt="20">
                Synopsis
              </Text>
              <Text light>{getItem.synopsis}</Text>
            </View>
            {/* section 4 */}
            <Center>
              <Text bold size="18" mt="20" mb="20">
                Showtimes and Tickets
              </Text>
            </Center>
            <Picker
              selectedValue={this.state.selectedDate}
              onValueChange={(item) => this.setState({ selectedDate: item })}>
              <Picker.Item label="Set a date" />
              {listDate.map((item) => (
                <Picker.Item value={item.name} label={item.name} />
              ))}
            </Picker>
            <Picker
              selectedValue={this.state.selectedLocation}
              onValueChange={(item) =>
                this.setState({ selectedLocation: item })
              }>
              <Picker.Item label="Set a city" />
              {listCity.map((item) => (
                <Picker.Item value={item.id} label={item.name} />
              ))}
            </Picker>
            {/* section 5 */}
            <FlatList
              data={this.state.showResults}
              keyExtractor={(item, index) => String(item.id)}
              renderItem={({ item }) => {
                let ParentData = item;
                return (
                  <Card mt="30">
                    <Center>
                      <Image
                        source={{ uri: item.picture }}
                        style={styles.cinemaImg}
                      />
                    </Center>
                    <Text center light mt="10">
                      {item.address}
                    </Text>

                    <Divider />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {item.times.map((times) => (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              selectedTime: { times, ParentData }
                            })
                          }>
                          <TextTime>{times.time}</TextTime>
                        </TouchableOpacity>
                      ))}
                    </View>
                    <Row justify="space-between" mt="20">
                      <Text light>Price</Text>
                      <Text semibold>${item.price}/seat</Text>
                    </Row>
                    <Row justify="space-between" mt="20">
                      <ButtonCustom
                        size="small"
                        style={styles.btn}
                        onPress={this.sendOrder}>
                        <Text white semibold>
                          Book now
                        </Text>
                      </ButtonCustom>
                      <ButtonCustom color="white" variant="white">
                        <Text primary semibold>
                          Add to cart
                        </Text>
                      </ButtonCustom>
                    </Row>
                  </Card>
                );
              }}
            />
            {/* section 6 */}
            {/* <Row justify="space-evenly" mt="10">
              <ButtonCustom
                size="small"
                color="white"
                variant="white"
                elevation="3"
                style={styles.btnPrev}>
                <Text primary>1</Text>
              </ButtonCustom>
              <ButtonCustom
                size="small"
                color="white"
                variant="white"
                elevation="3"
                style={styles.btnPrev}>
                <Text primary>2</Text>
              </ButtonCustom>
            </Row> */}
            {/* section 7 */}
            <Footer />
          </ScrollView>
        </Container>
      </Layout>
    );
  }
}

const Image = styled.Image`
  width: 159;
  height: 244;
  border-radius: 8;
  margin-top: ${(props) => props.mt || '0'};
`;
const TextTime = styled.Text`
  font-family: 'Mulish-Light';
  flex-wrap: wrap;
  min-width: 25%;
  margin-top: 10;
`;
const WrapperDesc = styled.View`
  flex: 1;
`;
const Divider = styled.View`
  height: 1px;
  margin-vertical: 10;
  background-color: ${theme.line};
`;
const styles = StyleSheet.create({
  btn: {
    flex: 1,
    maxWidth: '40%'
  },
  cinemaImg: {
    height: 30,
    resizeMode: 'contain'
  },
  wrapperDesc: {
    flex: 1
  },
  btnPrev: {
    minWidth: '15%'
  },
  picker: {
    backgroundColor: `${theme.bg}`,
    borderRadius: 12,
    marginTop: 10,
    padding: 10
  }
});

const mapStateToProps = (state) => ({
  movie: state.movie,
  showtime: state.showtime,
  order: state.order
});
const mapDispatchToProps = { getMovieDetail, getShowTime, createOrder };

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
