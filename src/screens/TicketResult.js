import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { TextBold, TextLight, TextSemiBold } from '../styles/Typography';
import { Card, Center, Container, Layout } from '../styles/StyledComponent';
import Check from '../assets/images/logos/check-circle.svg';
import BarCode from '../assets/images/logos/barcode.png';
import styled from 'styled-components';
import { View, StyleSheet } from 'react-native';
import Footer from '../components/Footer';
import Dash from 'react-native-dash';
import { sendSeatOrder } from '../redux/actions/order';
import { connect } from 'react-redux';
import moment from 'moment';

export class TicketResult extends Component {
  render() {
    const { dataMovie } = this.props.order.listOrder;
    const { dataShowtime } = this.props.order.listOrder;
    const { dataDate } = this.props.order.listOrder;
    const { seatOrder } = this.props.order;
    return (
      <ScrollView>
        <Container bgColor="transparent">
          <CardTicket border="white" mb="40" mt="30">
            <Container>
              <Center>
                <Check height={47} />
                <TextBold size="24">Thank You!</TextBold>
                <TextLight color="#AAAAAA">
                  Your transaction was successful
                </TextLight>
                <Row>
                  <Image source={BarCode} />
                  <Image source={BarCode} />
                  <Image source={BarCode} />
                </Row>
              </Center>
            </Container>
            <Dash
              dashColor="#DEDEDE"
              dashLength={7}
              dashGap={5}
              style={{ marginVertical: 20 }}
            />
            <Container>
              <Row>
                <Flex>
                  <Space>
                    <TextDesc>Movie</TextDesc>
                    <TextBold>{dataMovie.title}</TextBold>
                  </Space>
                  <Space>
                    <TextDesc>Date</TextDesc>
                    <TextBold>
                      {moment(dataDate).format('D MMMM YYYY')}
                    </TextBold>
                  </Space>
                  <Space>
                    <TextDesc>Count</TextDesc>
                    <TextBold>{seatOrder.length} pcs</TextBold>
                  </Space>
                </Flex>
                <Flex>
                  <Space>
                    <TextDesc>Category</TextDesc>
                    <TextBold>PG-13</TextBold>
                  </Space>
                  <Space>
                    <TextDesc>Time</TextDesc>
                    <TextBold>{dataShowtime.times.time}</TextBold>
                  </Space>
                  <Space>
                    <TextDesc>Seats</TextDesc>
                    <TextBold>{this.props.order.seatOrder + ''}</TextBold>
                  </Space>
                </Flex>
              </Row>
              <Card mt="20px">
                <Row justify="space-between">
                  <TextSemiBold>Total</TextSemiBold>
                  <TextSemiBold>
                    ${dataShowtime.ParentData.price * seatOrder.length}
                  </TextSemiBold>
                </Row>
              </Card>
            </Container>
          </CardTicket>
        </Container>
        <Layout>
          <Container>
            <Footer />
          </Container>
        </Layout>
      </ScrollView>
    );
  }
}

const CardTicket = styled.View`
  background-color: white;
  padding-vertical: 20;
  margin-vertical: 40;
  border-radius: 12px;
`;
const Image = styled.Image`
  width: 61;
  height: 61;
`;

const Space = styled.View`
  margin-top: 20px;
`;
const Flex = styled.View`
  flex: 1;
`;

const TextDesc = styled.Text`
  font-family: 'Mulish-Bold';
  color: #aaaaaa;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Evenly = styled.View`
  justify-content: space-around;
  margin-top: 20px;
`;

const styles = StyleSheet.create({
  dashed: {
    color: 'pink'
  }
});

const mapStateToProps = (state) => ({
  order: state.order
});

const mapDispatchToProps = { sendSeatOrder };

export default connect(mapStateToProps, mapDispatchToProps)(TicketResult);
