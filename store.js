import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';
import promise from 'redux-promise-middleware';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = rootReducer;

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.user.user) nextState.user.user = state.user.user;
    if (state.token.token) nextState.token.token = state.token.token;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const store = () => {
  return createStore(reducer, {}, bindMiddleware([thunkMiddleware, promise]));
};

export default createWrapper(store);
