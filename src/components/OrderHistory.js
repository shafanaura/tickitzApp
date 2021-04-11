import React, {Component} from 'react';
import {Image, StyleSheet, RefreshControl, FlatList} from 'react-native';
import {Card, Container, Layout} from '../styles/StyledComponent';
import {ScrollView} from 'react-native-gesture-handler';
import Footer from './Footer';
import styled from 'styled-components';
import ButtonCustom from './ButtonCustom';
import {Text} from '../styles/Typography';
import {connect} from 'react-redux';
import {getOrderUser} from '../redux/actions/order';
import moment from 'moment';

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isLoading: false,
      refreshing: false,
    };
  }
  async componentDidMount() {
    await this.props.getOrderUser(
      this.props.auth.token,
      this.props.auth.userData.id,
    );
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  };
  render() {
    console.log(this.props);
    const {allOrder} = this.props.order;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
        <Container bgColor="transparent">
          <FlatList
            data={allOrder}
            keyExtractor={(item, index) => String(item.id)}
            renderItem={({item}) => (
              <Card mt="20">
                <Image style={styles.img} source={{uri: item.picture}} />
                <TextDate>
                  {moment(item.dateTime).format('D MMMM YYYY')} - {item.time}
                </TextDate>
                <Title>{item.movie}</Title>
                <ButtonCustom color="success" variant="success">
                  <Text white semibold>
                    Ticket in active
                  </Text>
                </ButtonCustom>
              </Card>
            )}
          />
        </Container>
        <Container>
          <Footer />
        </Container>
      </ScrollView>
    );
  }
}

const TextDate = styled.Text`
  font-family: 'Mulish-Light';
  padding: 10px 0;
`;
const Title = styled.Text`
  font-family: 'Mulish-Semibold';
  padding-bottom: 20px;
  font-size: 18px;
`;
const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  btn: {
    borderRadius: 8,
    marginVertical: 20,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order,
});

const mapDispatchToProps = {
  getOrderUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
