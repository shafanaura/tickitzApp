import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Text, TextLight, ErrorText} from '../styles/Typography';
import {Card, Center, Container, Layout} from '../styles/StyledComponent';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import {ScrollView} from 'react-native-gesture-handler';
import Footer from './Footer';
import FormInput from './Form/FormInput';
import FormPassword from './Form/FormPassword';
import ButtonCustom from './ButtonCustom';
import {theme} from '../styles/ThemeColor';
import LogoutButton from '../components/LogoutButton';
import {connect} from 'react-redux';
import AlertCustom from '../components/AlertCustom';
import {Formik} from 'formik';
import * as yup from 'yup';
import {updateUser} from '../redux/actions/auth';
import {getUserDetail} from '../redux/actions/user';
import Test from '../test/Test';

const UpdateValidation = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  phoneNumber: yup.number('Number only'),
  password: yup
    .string()
    .min(6, ({min}) => `Passowrd must be at least ${min} characters`),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export class DetailsAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isLoading: false,
      refreshing: false,
    };
  }
  componentDidUpdate(prevState, prevProps) {
    if (prevState.fullName !== prevProps.fullName) {
      const getSeat = this.props.getUserDetail(
        this.props.auth.token,
        this.props.auth.userData.id,
      );
      console.log(getSeat);
    }
  }
  save = async values => {
    await this.props.updateUser(
      this.props.auth.token,
      this.props.auth.userData.id,
      {
        email: values.email,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        password: values.password,
      },
    );
    if (this.props.auth.message !== '') {
      this.setState({
        message: this.props.auth.message,
      });
    } else {
      this.setState({message: this.props.auth.errorMsg});
    }
  };
  _onRefresh = () => {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  };
  render() {
    const {userDetail} = this.props.user;
    return (
      <ScrollView>
        <Container
          bgColor="transparent"
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.save}
            />
          }>
          {/* section 1 */}
          <Card mt="20">
            <LogoutButton />
            <Row>
              <TextLight>INFO</TextLight>
              <Icon name="more-horizontal" size={30} color="#5F2EEA" />
            </Row>
            <Test />
            <Divider />
            <LoyaltyText>Loyalty Points</LoyaltyText>
            <CardPoint>
              <TextBold>Moviegoers</TextBold>
              <TextRange>
                320
                <TextPoint>points</TextPoint>
              </TextRange>
            </CardPoint>
            <Center>
              <Text mt="20">180 points become a master</Text>
              <Progress.Bar
                progress={0.5}
                width={250}
                height={16}
                unfilledColor="#F5F6F8"
                borderColor="white"
                borderRadius={20}
                color="#5F2EEA"
                marginVertical={20}
              />
            </Center>
          </Card>
          {/* section 2 */}
          <TextTitle>Account Settings</TextTitle>
          <Formik
            validateOnMount={true}
            validationSchema={UpdateValidation}
            initialValues={{
              email: userDetail.email,
              fullName: userDetail.fullName,
              phoneNumber: userDetail.phoneNumber,
              password: '',
              confirmPassword: '',
            }}
            onSubmit={values => this.save(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              initialErrors,
              initialTouched,
              isValid,
              errors,
              touched,
            }) => (
              <>
                <Card>
                  <TextDetail>Details Information</TextDetail>
                  <Divider />

                  <FormInput
                    label="Full Name"
                    name="fullName"
                    placeholder="Enter your Full Name"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    defaultValue={userDetail.fullName}
                    value={values.fullName}
                  />
                  {errors.fullName && touched.fullName && (
                    <ErrorText>{errors.fullName}</ErrorText>
                  )}
                  <FormInput
                    label="Email"
                    name="email"
                    placeholder="Write your e-mail"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    defaultValue={userDetail.email}
                    keyboardType="email-address"
                  />
                  {errors.email && touched.email && (
                    <ErrorText>{errors.email}</ErrorText>
                  )}
                  <FormInput
                    label="Phone Number"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    defaultValue={userDetail.phoneNumber}
                    keyboardType="number-pad"
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <ErrorText>{errors.phoneNumber}</ErrorText>
                  )}
                </Card>
                {/* section 3 */}
                <Space>
                  <Card>
                    <TextDetail>Account and Privacy</TextDetail>
                    <Divider />
                    <FormPassword
                      name="password"
                      placeholder="Write your password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                      label="New Password"
                    />
                    {errors.password && touched.password && (
                      <ErrorText>{errors.password}</ErrorText>
                    )}
                    <FormPassword
                      name="confirmPassword"
                      placeholder="Write your confirm Password"
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      secureTextEntry
                      label="Confirm"
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <ErrorText>{errors.confirmPassword}</ErrorText>
                    )}
                  </Card>
                </Space>
                <ButtonCustom mt={20} onPress={handleSubmit} size="large">
                  <Text semibold white>
                    Update Change
                  </Text>
                </ButtonCustom>
                {this.state.message !== '' && (
                  <AlertCustom status="success" message={this.state.message} />
                )}
              </>
            )}
          </Formik>
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

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const NameText = styled.Text`
  font-family: 'Mulish-Semibold';
  font-size: 20px;
  margin: 10px 0;
`;
const TypeText = styled.Text`
  font-family: 'Mulish-Light';
  margin-bottom: 30;
`;
const TextDetail = styled.Text`
  font-family: 'Mulish-Light';
  font-size: 16px;
  padding: 10px 0;
`;
const TextTitle = styled.Text`
  font-family: 'Mulish-Semibold';
  color: #14142b;
  font-size: 18px;
  padding: 20px 0;
`;
const TextBold = styled.Text`
  font-family: 'Mulish-Bold';
  color: white;
  font-size: 18px;
`;
const TextRange = styled.Text`
  font-family: 'Mulish-Semibold';
  color: white;
  font-size: 24px;
  padding-top: 20px;
`;
const TextPoint = styled.Text`
  font-family: 'Mulish-Light';
  color: white;
  font-size: 10px;
`;
const TextDescPoint = styled.Text`
  font-family: 'Mulish-Light';
  color: white;
  font-size: 16px;
`;
const LoyaltyText = styled.Text`
  font-family: 'Mulish-Semibold';
  font-size: 16px;
  margin: 30px 0;
`;
const CardPoint = styled.View`
  border-radius: 16px;
  background-color: #5f2eea;
  padding: 20px;
`;
const Space = styled.View`
  padding: 20px 0;
`;
const Divider = styled.View`
  height: 1px;
  background-color: ${theme.line};
  margin-bottom: 20px;
`;
const Image = styled.Image`
  width: 135;
  height: 135;
  border-radius: 100;
`;
const styles = StyleSheet.create({
  avatar: {
    margin: 8,
    resizeMode: 'contain',
  },
  btn: {
    marginVertical: 20,
    borderRadius: 8,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {
  updateUser,
  getUserDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsAccount);
