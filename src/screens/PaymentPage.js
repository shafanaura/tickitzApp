import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import listPay from '../utils/listPay';
import {
  CardInitial,
  Container,
  NavHeader,
  Row,
  Card
} from '../styles/StyledComponent';
import { TextLight, TextSemiBold, Text, ErrorText } from '../styles/Typography';
import CardPack from '../components/CardPack';
import FormInput from '../components/Form/FormInput';
import Footer from '../components/Footer';
import ButtonCustom from '../components/ButtonCustom';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components';
import { sendSeatOrder, createTransaction } from '../redux/actions/order';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { updateUser } from '../redux/actions/auth';

const UpdateValidation = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  phoneNumber: yup.number('Number only')
});

const WarningIcon = (props) => (
  <Icon {...props} color="#4E4B66" size={20} name="alert-triangle" />
);

export class PaymentPage extends Component {
  state = {
    listPay: []
  };
  createTransaction = async () => {
    const { dataMovie } = this.props.order.listOrder;
    const { dataShowtime } = this.props.order.listOrder;
    const dataDate = this.props.order.listOrder;
    const { dataLocation } = this.props.order.listOrder;
    const { seatOrder } = this.props.order;
    await this.props.createTransaction(
      this.props.auth.token,
      dataMovie.id,
      dataShowtime.ParentData.id,
      dataShowtime.times.id,
      dataLocation,
      dataDate,
      seatOrder
    );
    this.props.navigation.navigate('ticket-result');
  };
  save = async (values) => {
    await this.props.updateUser(
      this.props.auth.token,
      this.props.auth.userData.id,
      {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber
      }
    );
    if (this.props.auth.message !== '') {
      this.setState({
        message: this.props.auth.message
      });
    } else {
      this.setState({ message: this.props.auth.errorMsg });
    }
  };
  render() {
    const { dataShowtime } = this.props.order.listOrder;
    const { seatOrder } = this.props.order;
    const { userData } = this.props.auth;
    return (
      <View>
        <NavHeader>
          <Row justify="space-between" m="10px 0">
            <TextLight size="16">Total Payment</TextLight>
            <TextSemiBold size="20">
              ${dataShowtime.ParentData.price * seatOrder.length}
            </TextSemiBold>
          </Row>
        </NavHeader>
        <ScrollView>
          <Container bgColor="transparent">
            <CardPack title="Payment Method">
              <Row justify="space-between">
                {listPay.map((item, index) => {
                  return (
                    <TouchableOpacity>
                      <CardInitial
                        p="10px"
                        m="5px 0px"
                        radius="8"
                        key={item.id}>
                        <Image style={styles.img} source={item.image} />
                      </CardInitial>
                    </TouchableOpacity>
                  );
                })}
              </Row>
              <TextLight m="20px" align="center">
                Pay via cash{' '}
                <TextSemiBold primary>See how it work</TextSemiBold>
              </TextLight>
            </CardPack>
            <CardPack title="Personal Info">
              <Formik
                validateOnMount={true}
                validationSchema={UpdateValidation}
                initialValues={{
                  email: userData.email,
                  fullName: userData.fullName,
                  phoneNumber: userData.phoneNumber
                }}
                onSubmit={(values) =>
                  this.save(values).then(this.createTransaction)
                }>
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
                      label="Full Name"
                      name="fullName"
                      placeholder="Enter your Full Name"
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      value={values.fullName}
                      defaultValue={userData.fullName}
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
                      defaultValue={userData.email}
                      value={values.email}
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
                      defaultValue={userData.phoneNumber}
                      keyboardType="number-pad"
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <ErrorText>{errors.phoneNumber}</ErrorText>
                    )}
                    {/* section 3 */}

                    <ButtonCustom mt={20} onPress={handleSubmit} size="large">
                      <Text semibold white>
                        Pay your order
                      </Text>
                    </ButtonCustom>
                  </>
                )}
              </Formik>
            </CardPack>
          </Container>
          <Container>
            <Footer />
          </Container>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    paddingHorizontal: 30,
    width: 70,
    height: 18,
    resizeMode: 'contain'
  },
  btn: {
    paddingTop: 20
  }
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order
});

const mapDispatchToProps = { sendSeatOrder, createTransaction, updateUser };

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
