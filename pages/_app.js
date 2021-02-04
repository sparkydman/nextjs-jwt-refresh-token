import React from 'react';
import wrapper from '../store';

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

App.getInitialProps = async ({ Component, ctx }) => {
  try {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = (await Component.getInitialProps(ctx)) || {};
    }
    return { pageProps };
  } catch (err) {
    console.log(err);
  }
};

export default wrapper.withRedux(App);
