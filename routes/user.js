const express = require('express');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const {
  getAccessToken,
  getRefreshToken,
  requireAuth,
} = require('../middleware/auth');

const route = express.Router();

const User = require('../models/User');

// register user route
route.post('/', async (req, res) => {
  try {
    // get request body {username, email, password}
    const { username, email, password } = req.body;

    // check if the user already exist in the DB
    let user = await User.findOne({ email });
    if (user) {
      res.status(403).json({ msg: 'User already exist' });
    }

    // save to DB
    user = new User({ username, email, password });
    user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({ msg: 'Registered successfully!' });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

// Login user
route.post('/login', async (req, res) => {
  try {
    // get request body {email, password}
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    // check if user exist in the DB
    if (!user) {
      return res.status(404).json({ msg: 'Incorrect credentials' });
    }

    // compare password
    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) {
      return res.status(400).json({ msg: 'Incorrect credentials' });
    }
    // sign jwt token
    const payload = {
      user: { id: user._id },
    };
    const accessToken = getAccessToken(payload);
    const refreshToken = getRefreshToken(payload);

    user.refreshToken = refreshToken;

    await user.save();
    // set cookie header
    res
      .cookie('refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: true,
        path: '/',
      })
      .json({ accessToken });
  } catch (err) {
    console.log(err);
  }
});

// protected route
route.get('/me', requireAuth, async (req, res) => {
  // check  auth cookie
  let accessToken = req.headers['authorization'];
  if (!accessToken) {
    return res.status(401).json({ msg: 'Access denied, token required' });
  }
  accessToken = accessToken.split(' ')[1];

  try {
    // verify token
    const decode = jwt.verify(accessToken, process.env.JWT_ACCESSTOKEN);

    req.user = decode.user;

    const user = await User.findOne({ _id: req.user.id }).select([
      '-refreshToken',
      '-password',
    ]);

    res.json(user);
  } catch (err) {
    res.status(401).json({ msg: 'Access denied, invalid token' });
  }
});

// refresh token
route.get('/refresh', async (req, res) => {
  try {
    // check if refresh token is in the cookie headers
    let refreshToken = req.headers['cookie'];
    if (!refreshToken) {
      return res.status(401).json({ msg: 'Access denied, token required 1' });
    }
    // split the cookie string to get the actual cookie

    refreshToken = refreshToken.split('=')[1];
    //   verify if the cookie is valid or not

    const decode = jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN);
    // set the request user to the token payload
    req.user = decode.user;
    // find the user with the request user to get the refresh token from the database
    let user = await User.findOne({ _id: req.user.id });
    // check if the refresh token is equal to the one in the cookie heaer
    if (user.refreshToken !== refreshToken) {
      return res.status(401).json({ msg: 'Access denied, token not ours' });
    }
    //  generate new refresh and access token
    const payload = {
      user: { id: user._id },
    };
    refreshToken = getRefreshToken(payload);
    const accessToken = getAccessToken(payload);

    // save the new refresh token to the database
    user.refreshToken = refreshToken;
    await user.save();

    // set cookie header
    res
      .cookie('refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: true,
        path: '/',
      })
      .json({ accessToken });
  } catch (err) {
    res.status(401).clearCookie('refreshToken').redirect('/login');
  }
});

// protected route
route.get('/logout', requireAuth, async (req, res) => {
  // check  auth cookie
  let accessToken = req.headers['authorization'];
  accessToken = accessToken.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({ msg: 'Access denied, token required' });
  }

  try {
    // verify token
    const decode = jwt.verify(accessToken, process.env.JWT_ACCESSTOKEN);

    req.user = decode.user;

    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { refreshToken: undefined } }
    );
    // console.log(user);
    res.clearCookie('refreshToken').redirect('/login');
  } catch (err) {
    res
      .status(401)
      .json({ msg: 'Access denied, invalid token' })
      .redirect('/login');
  }
});

module.exports = route;
