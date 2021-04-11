import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Center, Container } from '../styles/StyledComponent';
import { Text } from '../styles/Typography';
import ButtonCustom from './ButtonCustom';
import FormInput from './Form/FormInput';

export class SubscribeForm extends Component {
  render() {
    return (
      <Card mb="100" mt="60">
        <Center>
          <Text light>Be the vanguard of the</Text>
          <Text bold size="32" primary>
            Moviegoers
          </Text>
        </Center>
        <FormInput placeholder="Type your email" />
        <ButtonCustom size="large">
          <Text white size="16">
            Join now
          </Text>
        </ButtonCustom>
        <Text light center mt="20">
          By joining you as a Tickitz member, we will always send you the latest
          updates via email .
        </Text>
      </Card>
    );
  }
}

export default SubscribeForm;
