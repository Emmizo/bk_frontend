import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

import AuthService from "../services/auth.service";

const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  localStorage.removeItem("msg");
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    // form.current.validateAll();

    if (email && password) {
      AuthService.login(email, password).then(
        () => {
          navigate("/jobApplied");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };
  return (
    <div className='App'>
      <Header />
      <div className='login-form container'>
        <div className='title'>
          <h1>Login </h1>
          <form onSubmit={handleLogin}>
            <div className='form-group col-md-12'>
              <span>email</span>
              <input
                type='text'
                name='email'
                value={email}
                onChange={onChangeEmail}
                // validations={[required]}
                className='form-control '
                placeholder='Email'
              />
            </div>
            <div className='form-group col-md-12'>
              <span>Password</span>
              <input
                type='password'
                name='password'
                value={password}
                onChange={onChangePassword}
                className='form-control '
                placeholder='Password'
              />
            </div>
            <div className='form-group m-5'>
              <div className='form-group'>
                <button
                  className='btn btn-primary btn-block'
                  disabled={loading}
                >
                  {loading && (
                    <span className='spinner-border spinner-border-sm'></span>
                  )}
                  <span>Login</span>
                </button>
              </div>

              {message && (
                <div className='form-group'>
                  <div className='alert alert-danger' role='alert'>
                    {message}
                  </div>
                </div>
              )}
              {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
              {/* <button className='btn btn-primary ' type='submit'>
                Sign In
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
