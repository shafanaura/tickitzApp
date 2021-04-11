import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './auth';
import movieReducer from './movie';
import orderReducer from './order';
import userReducer from './user';

const persistConfigAuth = {
  key: 'auth',
  storage: AsyncStorage
};

const persistConfigOrder = {
  key: 'order',
  storage: AsyncStorage
};
const persistedReducerAuth = persistReducer(persistConfigAuth, authReducer);
const persistedReducerOrder = persistReducer(persistConfigOrder, orderReducer);

const reducers = combineReducers({
  auth: persistedReducerAuth,
  movie: movieReducer,
  order: orderReducer,
  user: userReducer
});

export default reducers;
