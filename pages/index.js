import React, { useEffect } from "react";
import Head from "next/head";
import jsHttpCookie from "cookie";
import PropTypes from "prop-types";
import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import { getUser, logout } from "../actions/user";
import { appInitialProps } from "../auth";

const Home = ({ getUser, logout, user: { user, loading } }) => {
  useEffect(() => {
    console.log("loading");
    getUser();
  }, []);

  useEffect(() => {
    if (!loading && user === null) {
      Router.replace("/login");
    }
  }, [loading, user]);

  return (
    <div className="container">
      <Head>
        <title>Next refresh token</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!loading && user !== null ? (
        <>
          <h1 className="title">{`Welcome ${user.username}`}</h1>
          <Link href="/other">
            <a>go to other page</a>
          </Link>
          <button
            onClick={() => {
              logout();
              Router.replace("/login");
            }}
          >
            logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          margin: 0 auto;
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
        button {
          margin-top: 30px;
        }
      `}</style>
    </div>
  );
};

Home.getInitialProps = appInitialProps(true);

Home.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUser, logout })(Home);
