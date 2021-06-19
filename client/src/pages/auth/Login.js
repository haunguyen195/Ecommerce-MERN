import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { auth, googleAuthProvider } from './../../firebase';
import { LOGGED_IN_USER } from '../../actions/types';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //loading
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: LOGGED_IN_USER,
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push('/');
    } catch (error) {
      //
      console.log(error);
      toast.error(error.message);
      //loading
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    //
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: LOGGED_IN_USER,
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      //loading
      setLoading(false);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          placeholder='Your email address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          placeholder='Your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        onClick={handleSubmit}
        type='primary'
        className='mb-3'
        block
        shape='round'
        icon={<MailOutlined />}
        size='large'
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {!loading ? (
            <h4>Login</h4>
          ) : (
            <h4 className='text-danger'>Loading...</h4>
          )}
          {loginForm()}
          <Button
            onClick={googleLogin}
            type='danger'
            className='mb-3'
            block
            shape='round'
            icon={<GoogleOutlined />}
            size='large'
          >
            Login with Google
          </Button>
          <Link to='/forgot/password' className='float-right text-danger'>
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
