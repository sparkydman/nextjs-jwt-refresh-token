import React, { useEffect } from 'react';
import Head from 'next/head';
import jsHttpCookie from 'cookie';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../actions/user';
import { appInitialProps } from '../auth';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && !user.loading && user.msg) {
      Router.replace('/login');
    }
  }, [user]);

  return (
    <div className='container'>
      <Head>
        <title>Next refresh token</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {user.loading ? (
        <p>Loading...</p>
      ) : user.msg ? (
        <p>{user.msg}</p>
      ) : (
        user.user.username && (
          <>
            <h1 className='title'>{`Welcome ${
              user.user.username && user.user.username
            }`}</h1>
            <Link href='/other'>
              <a>go to other page</a>
            </Link>
            <button
              onClick={() => {
                dispatch(logout());
                Router.replace('/login');
              }}
            >
              logout
            </button>
          </>
        )
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

export default Home;
