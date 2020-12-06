// import wrapper from "./store";
// import { getUser } from "./actions/user";
import Router from "next/router";
import jsHttpCookie from "cookie";
import http from "./actions/request";

// export const authInitialProps = wrapper.getServerSideProps(
//   ({ store, res, req }) => {}
// );

export const getSessionFromServer = (req) => {
  const initProps = {};
  let user = {};
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (typeof cookies === "string") {
      const cookiesJSON = jsHttpCookie.parse(cookies);
      initProps.refreshToken = cookiesJSON.refreshToken;
    }
  }
  if (initProps.refreshToken) {
    http
      .get("/api/user/me")
      .then((result) => {
        user = result.data;
        console.log("result", result);
      })
      .catch(() => {});
  }
  return { user };
};

const redirectUser = (res, path) => {
  if (res) {
    res.redirect(302, path);
    res.finished = true;
    return {};
  }
  Router.replace(path);
  return {};
};

export const authInitialProps = (isProtectedRoute) => ({ req, res, query }) => {
  let auth = {};
  console.log("authinitial props");
  if (req) {
    auth = getSessionFromServer(req);
  }
  const currentPath = req ? req.url : window.location.pathname;
  const user = auth.user;
  const isAnonymous = !user;
  if (isProtectedRoute && isAnonymous && currentPath !== "/signin") {
    return redirectUser(res, "/signin");
  }
  console.log(user);
  return { user, query };
};
