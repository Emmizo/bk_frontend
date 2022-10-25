import React, { useEffect, useState } from "react";
import "../App.css";
import Header from "./header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authHeader from "../services/auth-header";
import Modal from "react-modal";
import { URL } from "../url";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
    overflowY: "scroll",
  },
};
Modal.setAppElement("#root");
const JobApplied = () => {
  const [applied, setApplied] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [cv, setCv] = useState("");
  const [IsOpen, setOpen] = React.useState(false);
  const [id, setId] = useState("");

  function openModal(cv) {
    setCv(cv);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function Close() {
    setOpen(false);
  }
  const dropped = (status) => {
    const form_data = new FormData();
    form_data.append("id", id);
    form_data.append("status", status);
    axios
      .post(`${URL}changeStatus`, form_data, {
        headers: authHeader(),
      })
      .then(
        () => {
          navigate("/jobApplied");
          window.location.reload();
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
  const passed = (status) => {
    const form_data = new FormData();
    form_data.append("id", id);
    form_data.append("status", status);
    axios
      .post(`${URL}changeStatus`, form_data, {
        headers: authHeader(),
      })
      .then(
        () => {
          navigate("/jobApplied");
          window.location.reload();
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
  const appId = (id) => {
    setId(id);
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${URL}application`, {
        headers: authHeader(),
      });
      setApplied(result.data);
      setMessage(result.data.Message);
      //   console.log(result.data);
    };
    setIsLoading(false);
    fetchData();
  }, [setApplied]);

  return (
    <div>
      <Header />
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div>
          <button className='btn btn-danger' onClick={closeModal}>
            X
          </button>
        </div>
        <br />
        <iframe
          title='description'
          src={`http://localhost:8000/${cv}`}
          className='document-card'
        ></iframe>
      </Modal>
      <Modal
        isOpen={IsOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div>
          <button className='btn btn-danger' onClick={Close}>
            X
          </button>
        </div>
        <br />
        <div className='row new-add'>
          <div className='col-md-3'>
            <button className='btn btn-danger' onClick={() => dropped(2)}>
              Drop
            </button>
          </div>
          <div className='col-md-3'>
            <button className='btn btn-success' onClick={() => passed(1)}>
              Accept
            </button>
          </div>
        </div>
      </Modal>
      <div className='all-application'>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <div>
            <div className='jobs-available'>{message?.data?.Message}</div>
            <table>
              <tbody>
                <tr>
                  <th>Title</th>
                  <th>Applicant</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>View cv</th>
                  <th>Status</th>
                </tr>
                {applied?.data?.map((data) => (
                  <tr key={data.apply_id} className='list'>
                    <td>{data.title}</td>
                    <td>{data.fullname}</td>
                    <td>{data.phone}</td>
                    <td>{data.email}</td>
                    <td>
                      <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => openModal(data.cv)}
                      >
                        View CV
                      </button>
                    </td>
                    <td>
                      {data.status === 0 ? (
                        <button
                          className='btn btn-primary'
                          onClick={() => appId(data.apply_id)}
                        >
                          Pending
                        </button>
                      ) : data.status === 1 ? (
                        <button className='btn btn-success'>Passed</button>
                      ) : data.status === 2 ? (
                        <button className='btn btn-danger'>Dropped</button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default JobApplied;
