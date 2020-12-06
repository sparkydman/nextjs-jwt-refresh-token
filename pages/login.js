import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Head from "next/head";
import Link from "next/link";
import jsHttpCookie from "cookie";
import { connect } from "react-redux";
import { login } from "../actions/user";

const Login = ({ login }) => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    login(formdata);
    setTimeout(() => {
      Router.replace("/");
    }, 2000);
  };

  return (
    <div className="container">
      <Head>
        <title>Next refresh token</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="title">Login Form</h1>

      <form onSubmit={handlesubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          required
          value={formdata.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required
          value={formdata.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
        <p>
          You don't have account?{" "}
          <Link href="/signup">
            <a>Register</a>
          </Link>{" "}
        </p>
      </form>

      <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        margin: 0 auto;
      }
      h1 {
        text-align: center;
        font-size: 2em;
        padding-top: 3em;
        padding-bottom: 1.5em;
      }
      form {
        width: 60%;
        margin: 0 auto;
        padding: 10px;
      }
      input {
        display: block;
        width: 100%;
        padding: 10px 5px;
        margin: 2em;
      }
      button {
        padding: 5px 30px;
        display: block;
        margin 0 auto;
      }
      p{
        text-align: center;
        margin-top: 20px;
      }
      a{
        color: blue;
      }
    `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

Login.getInitialProps = async ({ req, res }) => {
  const initProps = {};
  let isAuth = false;
  if (req && req.headers) {
    const cookies = req.headers.cookie;
    if (typeof cookies === "string") {
      const cookiesJSON = jsHttpCookie.parse(cookies);
      initProps.refreshToken = cookiesJSON.refreshToken;
    }
  }
  if (initProps.refreshToken) {
    isAuth = true;
    res.redirect(302, "/");
    res.finished = true;
    return {};
  }
  return { isAuth };
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
