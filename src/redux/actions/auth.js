import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../../helpers/http';

export const login = (email, password) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      });
      const results = await http().post('auth/login', params);
      AsyncStorage.setItem('token', results.data.token);
      dispatch({
        type: 'LOGIN',
        payload: results.data.token,
        userData: results.data.userData
      });
    } catch (err) {
      const { message } = err.response.data;
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      });
    }
  };
};

export const updateUser = (token, id, data) => {
  return async (dispatch) => {
    const params = new FormData();
    if (data.picture) {
      params.append('picture', data.picture);
    }
    if (data.fullName) {
      params.append('fullName', data.fullName);
    }
    if (data.email) {
      params.append('email', data.email);
    }
    if (data.phoneNumber) {
      params.append('phoneNumber', data.phoneNumber);
    }
    if (data.password) {
      params.append('password', data.password);
    }
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      });
      dispatch({
        type: 'UPDATE_USER',
        message: ''
      });
      const response = await http(token).patch(`user/${id}`, params);
      console.log(response.data);
      dispatch({
        type: 'UPDATE_USER',
        payload: {
          ...response.data.userData,
          message: response.data.message
          // errorMsg: null,
          // userData: response.data.results,
        }
      });
    } catch (err) {
      console.log(err);
      const { message } = err.response.data;
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      });
    }
  };
};

export const register = (email, password) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: ''
      });
      const response = await http().post('auth/register', params);
      dispatch({
        type: 'REGISTER',
        payload: response.data.message
      });
    } catch (err) {
      const { message } = err.response.data;
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message
      });
    }
  };
};

export const autoLogin = (payload) => ({
  type: 'LOGIN',
  payload
});

export const logout = () => ({
  type: 'LOGOUT'
});
