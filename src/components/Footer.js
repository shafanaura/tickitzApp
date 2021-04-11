import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Logo from '../assets/images/logos/tickitz-purple.svg';
import ebv from '../assets/images/cinemas/ebv.png';
import cineone from '../assets/images/cinemas/cineone.png';
import hiflix from '../assets/images/cinemas/hiflix.png';
import { Text } from '../styles/Typography';
import { Container, Layout, Row } from '../styles/StyledComponent';

const Footer = () => {
  return (
    <Layout>
      <Logo />
      <Text light size="16" mb="10">
        Stop waiting in line. Buy tickets conveniently, watch movies quietly.
      </Text>
      {/* section 1 */}
      <Text semibold size="16" mb="8">
        Explore
      </Text>
      <Row justify="space-between">
        <Text light>Cinemas</Text>
        <Text light>Movies List</Text>
        <Text light>Notification</Text>
        <Text light>Cinemas</Text>
      </Row>
      {/* section 2 */}
      <Text semibold size="16" mt="10">
        Our Sponsor
      </Text>
      <Row justify="space-between">
        <Image source={ebv} style={styles.logo} />
        <Image source={cineone} style={styles.logo} />
        <Image source={hiflix} style={styles.logo} />
      </Row>
      {/* section 3 */}
      <Text semibold size="16" mt="10" mb="8">
        Follow us
      </Text>
      <Row>
        <Icon style={styles.icon} name="facebook" size={25} color="#8F9BB3" />
        <Icon style={styles.icon} name="instagram" size={25} color="#8F9BB3" />
        <Icon style={styles.icon} name="twitter" size={25} color="#8F9BB3" />
        <Icon style={styles.icon} name="youtube" size={25} color="#8F9BB3" />
      </Row>
      <Text light mt="20" mb="20">
        © 2020 Tickitz. All Rights Reserved.
      </Text>
    </Layout>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white'
  },
  logo: {
    marginTop: 5,
    width: 90,
    height: 40,
    resizeMode: 'contain'
  },
  icon: {
    marginRight: 20
  }
});
