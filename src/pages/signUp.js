import React, { useState, useEffect } from "react";
import Header from "./header";
import { Link } from "react-router-dom";
const SignUp = () => {
  // Declare a new state variable, which we'll call "count"
  //   const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Header />
      <div className='sign-up-form container'>
        <div className='title'>
          <h3>Create account as Job Seeker </h3>
          <hr />
          <div className='row-div'>
            <div className='form-group col-md-6'>
              <span>Full Name</span>
              <input
                type='text'
                name='fullname'
                id='fullname'
                className='form-control '
                placeholder='Full Name'
              />
            </div>
            <div className='form-group col-md-6'>
              <span>Username</span>
              <input
                type='text'
                name='username'
                id='username'
                className='form-control '
                placeholder='Username'
              />
            </div>
          </div>
          <div className='row-div'>
            <div className='form-group col-md-6'>
              <span>Phone</span>
              <input
                type='text'
                name='phone'
                id='phone'
                className='form-control '
                placeholder='Username'
              />
            </div>
            <div className='form-group col-md-6'>
              <span>Email</span>
              <input
                type='text'
                name='email'
                id='email'
                className='form-control'
                placeholder='email'
              />
            </div>
          </div>
          <div className='form-group m-3'>
            <button className='btn btn-primary' type='submit'>
              <Link className='buttons' to='/applied'>
                Sign Up
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
