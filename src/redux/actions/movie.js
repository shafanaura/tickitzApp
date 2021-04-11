import http from '../../helpers/http';

export const movie = (title) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('title', title);
    try {
      dispatch({
        type: 'SET_CREATE_MOVIE_MESSAGE',
        payload: ''
      });
      const results = await http(this.props.auth.token).post(`movies`, params);
      dispatch({
        type: 'CREATE_MOVIE',
        payload: results.data.token
      });
    } catch (err) {
      const { message } = err.response.data;
      dispatch({
        type: 'SET_CREATE_MOVIE_MESSAGE',
        payload: message
      });
    }
  };
};

export const getAllMovie = () => {
  return async (dispatch) => {
    const response = await http().get('movies');
    dispatch({
      type: 'GET_ALL_MOVIE',
      payload: response.data.results
    });
  };
};

export const getSortMovie = (sort) => {
  return async (dispatch) => {
    const data = new URLSearchParams();
    data.append('sort', sort);
    const response = await http().get(`movies?${data.toString()}`);
    dispatch({
      type: 'GET_ALL_MOVIE',
      payload: response.data.results
    });
  };
};

export const getSearchMovie = (search) => {
  return async (dispatch) => {
    const data = new URLSearchParams();
    data.append('search', search);
    const response = await http().get(`movies?${data.toString()}`);
    dispatch({
      type: 'GET_ALL_MOVIE',
      payload: response.data.results
    });
  };
};

export const getOrderMovie = (order) => {
  return async (dispatch) => {
    const data = new URLSearchParams();
    data.append('order', order);
    const response = await http().get(`movies?${data.toString()}`);
    dispatch({
      type: 'GET_ALL_MOVIE',
      payload: response.data.results
    });
  };
};

export const getMovieDetail = (id) => {
  return async (dispatch) => {
    const response = await http().get(`movies/${id}`);
    dispatch({
      type: 'GET_MOVIE_DETAIL',
      payload: response.data.results
    });
  };
};
