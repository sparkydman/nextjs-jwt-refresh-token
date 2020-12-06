import React, { useEffect } from "react";
import wrapper from "../store";
import httpCookie from "cookie";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// App.getInitialProps = async ({ Component, ctx }) => {
//   try {
//     let pageProps = {};
//     if (Component.getInitialProps) {
//       const cookie = ctx.req.headers.cookie;
//       console.log("to lvl: ", cookie);
//       pageProps = (await Component.getInitialProps(ctx)) || {};
//     }
//     return { pageProps };
//   } catch (err) {
//     console.log(err);
//   }
// };

export default wrapper.withRedux(App);
