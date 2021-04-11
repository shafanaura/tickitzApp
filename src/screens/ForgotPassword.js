import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { register } from '../redux/actions/auth';
import { connect } from 'react-redux';

import ButtonCustom from '../components/ButtonCustom';
import FormInput from '../components/Form/FormInput';
import FormPassword from '../components/Form/FormPassword';
import { Container, Layout } from '../styles/StyledComponent';
import { Text } from '../styles/Typography';
import styled from 'styled-components';

export class ForgotPassword extends Component {
  state = {
    email: '',
    password: ''
  };
  save = () => {
    const { email, password } = this.state;
    this.props.register(email, password);
  };
  render() {
    return (
      <Layout>
        <Container>
          <Text semibold size="24" mb="20">
            Forgot Password
          </Text>
          <FormInput
            onChangeText={(email) => this.setState({ email })}
            label="Email"
            placeholder="Write your e-mail"
          />
          <ButtonCustom mt={20} onPress={this.save} size="large">
            <Text
              bold
              white
              onPress={() => this.props.navigation.navigate('login')}>
              Reset Password
            </Text>
          </ButtonCustom>
        </Container>
      </Layout>
    );
  }
}

const Center = styled.View`
  align-items: center;
  justify-content: center;
`;

const mapStateToProps = (state) => ({
  auth: state.auth
});
const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
