import http from '../../helpers/http';

export const createOrder = (
  dataLocation,
  dataDate,
  dataShowtime,
  dataMovie
) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('dataShowtime', dataShowtime);
    params.append('dataMovie', dataMovie);
    params.append('dataDate', dataDate);
    params.append('dataLocation', dataLocation);
    const data = { dataLocation, dataDate, dataShowtime, dataMovie };
    try {
      dispatch({
        type: 'SET_ORDER_MESSAGE',
        payload: ''
      });
      dispatch({
        type: 'CREATE_ORDER',
        payload: data
      });
    } catch (err) {
      const { message } = err.response.data;
      dispatch({
        type: 'SET_ORDER_MESSAGE',
        payload: message
      });
    }
  };
};

export const sendSeatOrder = (data = []) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_ORDER_MESSAGE',
        payload: ''
      });
      dispatch({
        type: 'GET_SEAT',
        payload: data
      });
    } catch (err) {
      const { message } = err.response.data;
      dispatch({
        type: 'SET_ORDER_MESSAGE',
        payload: message
      });
    }
  };
};

export const createTransaction = (
  token,
  idMovie,
  idCinema,
  idTime,
  idLocation,
  dateTime,
  seatName,
  price
) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('idMovie', idMovie);
    params.append('idCinema', idCinema);
    params.append('idTime', idTime);
    params.append('idLocation', idLocation);
    params.append('dateTime', dateTime);
    params.append('seatName', seatName);
    params.append('price', price);
    try {
      dispatch({
        type: 'SET_ORDER_MESSAGE',
        payload: ''
      });
      const response = await http(token).post('orders', params);
      dispatch({
        type: 'CREATE_TRANSACTION',
        payload: response.data.message
      });
      console.log(response.data.message);
    } catch (err) {
      // console.log(err);
      const { message } = err.response.data;
      console.log(message);
      dispatch({
        type: 'SET_ORDER_MESSAGE',
        payload: message
      });
    }
  };
};

export const getOrderUser = (token, id) => {
  return async (dispatch) => {
    const response = await http(token).get(`orders/${id}`);
    dispatch({
      type: 'GET_ALL_ORDER',
      payload: response.data.results
    });
    dispatch({
      type: 'TOGGLE_ORDER_LOADING'
    });
  };
};
