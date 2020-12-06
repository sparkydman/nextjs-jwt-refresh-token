import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { connect } from "react-redux";
import { register } from "../actions/user";

const Signup = ({ register, loading }) => {
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!loading) {
      Router.push("/login");
    }
  }, [loading]);

  const onChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register(formdata);
  };

  return (
    <div className="container">
      <Head>
        <title>Next refresh token</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="title">Registeration Form</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={onChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          required
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required
          onChange={onChange}
        />
        <button type="submit">Submit</button>
        <p>
          Already have an account?{" "}
          <Link href="/login">
            <a>Login</a>
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

Signup.propTypes = {
  register: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
});

export default connect(mapStateToProps, { register })(Signup);
