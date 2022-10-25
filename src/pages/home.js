import React, { useEffect, useState } from "react";
import "../App.css";
import Header from "./header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../url";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "100vh",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
    overflowY: "scroll",
  },
};

Modal.setAppElement("#root");

const Home = () => {
  const [jobs, setJobs] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [content, setContent] = useState();
  const [ids, setIds] = useState();
  const msg = localStorage.getItem("msg");

  const job = (id, title) => {
    // alert(id);
    localStorage.setItem("jobId", id);
    localStorage.setItem("title", title);
    navigate("/applied");
  };

  function openModal(title, description, content, id) {
    setTitle(title);
    setDescription(description);
    setContent(content);
    setIds(id);

    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${URL}jobs`);
      setJobs(result.data);
    };
    setIsLoading(false);
    fetchData();
  }, [setJobs]);

  return (
    <div className='App'>
      <Header />
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='main-detail'>
          <div>
            <button className='btn btn-danger' onClick={closeModal}>
              X
            </button>
          </div>
          <br />
          <div className='title-detail'>
            <div className='job-titles'>Title:</div>
            <div className='job-name'>{title}</div>
          </div>
          <div className='content_data'>
            <div className='head_content'>What you will do</div>
            <div className='content'>{content}</div>
          </div>
          <div className='content_data'>
            <div className='head_content'>Role</div>
            <div className='content'>{description}</div>
          </div>
          <div className='apply'>
            <button className='btn btn-primary' onClick={() => job(ids, title)}>
              Apply
            </button>
          </div>
        </div>
      </Modal>

      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          {msg ? <div className='btn btn-success'>{msg}</div> : ""}
          <div className='jobs-available'>{jobs?.data?.Message}</div>
          {jobs?.data?.map((data) => (
            <div key={data.id} className='row-jobs'>
              <div className='job-title '>{data.title}</div>
              <div className='view-detail'>
                <button
                  type='button'
                  className='btn btn-primary cv'
                  onClick={() =>
                    openModal(
                      data.title,
                      data.description,
                      data.content,
                      data.id
                    )
                  }
                >
                  Read more
                </button>

                <button
                  className='btn btn-primary cv'
                  onClick={() => job(data.id, data.title)}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;
