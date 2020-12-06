import Router from "next/router";
import jsHttpCookie from "cookie";

const redirectUser = (res, path) => {
  if (res) {
    res.redirect(302, path);
    res.finished = true;
    return {};
  }
  Router.replace(path);
  return {};
};

export const appInitialProps = (isAuthRequired) => ({ req, res, query }) => {
  const initProps = {};
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (typeof cookies === "string") {
      const cookiesJSON = jsHttpCookie.parse(cookies);
      initProps.refreshToken = cookiesJSON.refreshToken;
    }
    if (!initProps.refreshToken && isAuthRequired) {
      return redirectUser(res, "/login");
    }
  }
  return { query };
};
