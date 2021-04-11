import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducers from './reducers';
import { persistStore } from 'redux-persist';

const persistedStore = () => {
  let store = createStore(rootReducers, applyMiddleware(thunk, logger));
  let persistor = persistStore(store);
  return { store, persistor };
};

export default persistedStore;
