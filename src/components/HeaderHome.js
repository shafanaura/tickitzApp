import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { Text } from '../styles/Typography';
import { Container } from '../styles/StyledComponent';
import Logo from '../assets/images/logos/tickitz-purple.png';
import Bar from '../assets/icons/drawer-icon.svg';

const HeaderHome = () => {
  return (
    <Container>
      <Row justify="space-between">
        <Image source={Logo} style={styles.logo} />
        <Bar />
      </Row>
    </Container>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 60,
    width: 120,
    resizeMode: 'contain'
  }
});

export const Row = styled.View`
  flex-direction: row;
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: center;
`;

export default HeaderHome;
