import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Logo from '../assets/images/logos/tickitz-purple.png';
import { Container } from '../styles/StyledComponent';

const HeaderAuth = () => {
  return (
    <Container>
      <Image source={Logo} style={styles.img} />
    </Container>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 40,
    width: 70,
    resizeMode: 'contain'
  }
});

export default HeaderAuth;
