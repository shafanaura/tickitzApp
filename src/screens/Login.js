import React, { Component } from 'react';
import { login, autoLogin } from '../redux/actions/auth';
import { connect } from 'react-redux';

import ButtonCustom from '../components/ButtonCustom';
import FormInput from '../components/Form/FormInput';
import { Container, Layout } from '../styles/StyledComponent';
import { ErrorText, Text } from '../styles/Typography';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertCustom from '../components/AlertCustom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ActivityIndicator } from 'react-native';

const RegisterValidation = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required')
});

export class Login extends Component {
  state = {
    message: '',
    isLoading: false
  };
  save = async (values) => {
    this.setState({ isLoading: true });
    await this.props.login(values.email, values.password);
    if (typeof this.props.auth.token === 'string') {
      this.setState({ isLoading: true });
      this.props.navigation.navigate('home-page');
    } else {
      this.setState({ isLoading: false });
      this.setState({ message: this.props.auth.errorMsg });
    }
  };
  componentDidMount() {
    const token = AsyncStorage.getItem('token');
    if (token) {
      this.props.autoLogin(token);
      console.log(token);
    }
  }
  render() {
    return (
      <Layout>
        <Container>
          <Text semibold size="24" mb="20">
            Sign In
          </Text>
          {this.state.message !== '' && (
            <AlertCustom status="warning" message={this.state.message} />
          )}
          <Formik
            validateOnMount={true}
            validationSchema={RegisterValidation}
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => this.save(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
              initialErrors,
              initialTouched,
              isValid,
              errors,
              touched
            }) => (
              <>
                <FormInput
                  label="Email"
                  name="email"
                  placeholder="Write your e-mail"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  values={values.email}
                  keyboardType="email-address"
                />
                {errors.email && touched.email && (
                  <ErrorText>{errors.email}</ErrorText>
                )}
                <FormInput
                  label="Password"
                  name="password"
                  placeholder="Write your password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  values={values.password}
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <ErrorText>{errors.password}</ErrorText>
                )}
                {this.state.isLoading === false ? (
                  <ButtonCustom mt={20} onPress={handleSubmit} size="large">
                    <Text semibold white>
                      Sign In
                    </Text>
                  </ButtonCustom>
                ) : (
                  <ActivityIndicator size="small" color="#0000ff" />
                )}
              </>
            )}
          </Formik>
          <Center>
            <Text center mt="15">
              Forgot your password?{' '}
              <Text
                primary
                semibold
                onPress={() =>
                  this.props.navigation.navigate('forgot-password')
                }>
                Reset Password
              </Text>
            </Text>
          </Center>
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
const mapDispatchToProps = { login, autoLogin };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
