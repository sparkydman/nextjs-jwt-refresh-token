import { combineReducers } from 'redux';
import {
  getTokenReducer,
  getUserReducer,
  loginReducer,
  logoutReducer,
  registerReducer,
} from './user';

export default combineReducers({
  register: registerReducer,
  login: loginReducer,
  token: getTokenReducer,
  user: getUserReducer,
  logout: logoutReducer,
});
