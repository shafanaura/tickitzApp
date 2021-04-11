import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { Container, Layout } from '../styles/StyledComponent';
import { Text } from '../styles/Typography';

import imgHero1 from '../assets/images/movies/spiderman.jpg';
import imgHero2 from '../assets/images/movies/lion.jpg';
import imgHero3 from '../assets/images/movies/ironman.jpg';

import NowShowing from '../components/NowShowing';
import UpcomingMovie from '../components/UpcomingMovie';
import SubscribeForm from '../components/SubscribeForm';
import Footer from '../components/Footer';
class HomePage extends Component {
  render() {
    return (
      <Layout>
        <ScrollView>
          <Container>
            <Text light mt="20" size="16">
              Nearest Cinema, Newest Movie,
            </Text>
            <Text bold size="36" primary>
              Find out now!
            </Text>

            {/* section 1 */}
            <Row>
              <Image mt="80" source={imgHero1} />
              <Image mt="50" source={imgHero2} />
              <Image mt="30" source={imgHero3} />
            </Row>
            {/* section 2 */}
            <NowShowing navigation={this.props.navigation} />
            {/* section 3 */}
            <UpcomingMovie />
            {/* section 4 */}
            <SubscribeForm />
            {/* section 5 */}
            <Footer />
          </Container>
        </ScrollView>
      </Layout>
    );
  }
}

const Image = styled.Image`
  height: 330;
  width: 100;
  border-radius: 8;
  margin-top: ${(props) => props.mt || '0'};
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0 50px 0;
`;

export default HomePage;
