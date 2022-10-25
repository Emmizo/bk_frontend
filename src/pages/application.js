import React, { useState } from "react";
import Header from "./header";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";

const Application = () => {
  const id = localStorage.getItem("jobId");
  const title = localStorage.getItem("title");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cv, setCv] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const msg = "Thank u your application receive";
  const formData = new FormData();
  formData.append("fullname", fullname);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("job_id", id);
  formData.append("cv", cv);
  const postData = () => {
    axios.post(`${URL}apply`, formData).then(
      () => {
        navigate("/");
        localStorage.setItem("msg", msg);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setIsLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className='App'>
      <Header />
      <div className='sign-up-form container'>
        <div className='title'>
          <h3>Your going to apply for {title} </h3>
          <hr />
          {/* <form> */}
          <div className='row-div'>
            <div className='form-group col-md-6'>
              <span>Full Name</span>
              <input
                type='text'
                name='fullname'
                id='fullname'
                onChange={(e) => setFullname(e.target.value)}
                className='form-control '
                placeholder='Full Name'
              />
            </div>
            <div className='form-group col-md-6'>
              <span>Phone</span>
              <input
                type='text'
                name='phone'
                id='phone'
                onChange={(e) => setPhone(e.target.value)}
                className='form-control '
                placeholder='phone'
              />
            </div>
          </div>
          <div className='row-div'>
            <div className='form-group col-md-6'>
              <span>Email</span>
              <input
                type='text'
                name='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                className='form-control'
                placeholder='email'
              />
            </div>

            <div className='form-group col-md-6'>
              <span>Upload CV</span>
              <input
                type='file'
                name='cv'
                id='cv'
                onChange={(e) => setCv(e.target.files[0])}
                className='form-control '
              />
            </div>
          </div>
          <div className='form-group m-3'>
            {isLoading && (
              <span className='spinner-border spinner-border-sm'></span>
            )}
            <button
              className='btn btn-primary'
              onClick={postData}
              type='submit'
            >
              Apply
            </button>
          </div>
          {message && (
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Application;
