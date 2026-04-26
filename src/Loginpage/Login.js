import React, { useState, useContext } from 'react';
import './Login.css';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Checkoutcontext } from '../Contexts/Checkoutcontext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setUser } = useContext(Checkoutcontext); // Access context function
  const navigate = useNavigate();

  const handleAuth = async (isRegister) => {
    setLoading(true);
    setError('');
    try {
      let userCredential;
      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      // Update user in context
      setUser(userCredential.user);

      // Redirect to home page
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e, isRegister = false) => {
    e.preventDefault();
    handleAuth(isRegister);
  };

  return (
    <div className='login'>
      <a href="/"><img className="login-logo" src="/images/amazon-logo.png" alt="Amazon Logo" /></a>

      <div className="login-container">
        <h1 className='login-title'>Sign in</h1>

        <form className='login-form' onSubmit={(e) => handleSubmit(e)}>
          <h5>Email:</h5>
          <input
            type="email"
            placeholder='Enter your e-mail'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password:</h5>
          <input
            type="password"
            placeholder='Ex: querty@$$12345'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login-error">{error}</p>}

          <button
            className='login-signin-button'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p>
          <small>By signing in, you agree to the AMAZON CLONE Conditions of Use and Sale.</small>
        </p>

        <div className="login-base">
          <button
            className='create-account-button'
            type='button'
            disabled={loading}
            onClick={(e) => handleSubmit(e, true)}
          >
            {loading ? 'Creating account...' : 'Create an Account'}
          </button>
          <p><small>Don't have an account?</small></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
