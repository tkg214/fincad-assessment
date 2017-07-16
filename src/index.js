import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';
import App from './containers/App';
import { isProd } from './utils/common';

// eslint-disable-next-line no-underscore-dangle */
const composeEnhancers =
  (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const logger = isProd ? null : createLogger();

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware, logger))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
