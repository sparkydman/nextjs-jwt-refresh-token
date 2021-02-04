import Router from 'next/router';
import jsHttpCookie from 'cookie';
import { getUser } from './actions/user';
// import { store } from './store';

export const redirectUser = (res, path) => {
  if (res) {
    res.redirect(302, path);
    res.finished = true;
    return {};
  }
  Router.replace(path);
  return {};
};

export const appInitialProps = (isAuthRequired) => async ({
  req,
  res,
  store,
}) => {
  // console.log('isAuthenticated');
  const initProps = {};
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (typeof cookies === 'string') {
      const cookiesJSON = jsHttpCookie.parse(cookies);
      initProps.refreshToken = cookiesJSON.refreshToken;
    }
    if (!initProps.refreshToken && isAuthRequired) {
      return redirectUser(res, '/login');
    }
    if (isAuthRequired) {
      // console.log(await store.dispatch(getUser()));
      await store.dispatch(getUser());
      // const me = store.getState().user;
      // console.log('auth: ', me);
    }
  }
  return {};
};
