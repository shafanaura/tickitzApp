import React, { Component } from 'react';
import { register } from '../redux/actions/auth';
import { connect } from 'react-redux';

import ButtonCustom from '../components/ButtonCustom';
import FormInput from '../components/Form/FormInput';
import { Container, Layout } from '../styles/StyledComponent';
import { ErrorText, Text } from '../styles/Typography';
import styled from 'styled-components';
import AlertCustom from '../components/AlertCustom';
import { Formik } from 'formik';
import * as yup from 'yup';

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

export class Register extends Component {
  state = {
    message: ''
  };
  save = async (values) => {
    await this.props.register(values.email, values.password);
    if (this.props.auth.message !== '') {
      this.setState({
        message: this.props.auth.message + ', now you can Login'
      });
    } else {
      this.setState({ message: this.props.auth.errorMsg });
    }
  };
  render() {
    return (
      <Layout>
        <Container>
          <Text semibold size="24" mb="20">
            Sign Up
          </Text>
          {this.state.message !== '' && (
            <AlertCustom status="success" message={this.state.message} />
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
                  value={values.email}
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
                  value={values.password}
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <ErrorText>{errors.password}</ErrorText>
                )}
                <ButtonCustom mt={20} onPress={handleSubmit} size="large">
                  <Text semibold white>
                    Join for free now
                  </Text>
                </ButtonCustom>
              </>
            )}
          </Formik>

          <Center>
            <Text center mt="15">
              Already have an account?{' '}
              <Text
                primary
                semibold
                onPress={() => this.props.navigation.navigate('login')}>
                Login
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
const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
