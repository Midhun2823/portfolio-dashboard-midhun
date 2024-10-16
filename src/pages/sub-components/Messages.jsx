import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessageSlice,
} from "../../store/slices/messagesSlice";
import { toast } from "react-toastify";

const Messages = () => {
  const navigateTo = useNavigate();
  // const handleReturnToDashboard = () => {
  //   navigateTo("/");
  // };

  const { loading, messages, error, message } = useSelector(
    (state) => state.messages
  );

  const [messageId, setMessageId] = useState("");

  const dispatch = useDispatch();
  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessageSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message, loading]);

  return (
    <>
      <div className="m-3 p-3">
        <div class="card">
          <div class="card-header">
            <span className="fs-4">Messages</span>
            {/* <button
              onClick={handleReturnToDashboard}
              className="float-end btn btn-outline-dark"
            >
              Return to Dashboard
            </button> */}
          </div>
          <div class="card-body row">
            {messages && messages.length > 0 ? (
              messages.map((ele) => {
                return (
                  <div key={ele._id} className="col-md-4">
                    <div className="card m-3" style={{ width: "18rem;" }}>
                      <ul class="list-group list-group-flush">
                        <li className="list-group-item">
                          <div className="row">
                            <span className="col-md-5 fw-bold">
                              Sender Name:
                            </span>
                            <span className="col-md-7"> {ele.senderName}</span>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div className="row">
                            <span className="col-md-5 fw-bold">Subject:</span>
                            <span className="col-md-7"> {ele.subject} </span>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div className="row">
                            <span className="col-md-5 fw-bold">Message:</span>
                            <span className="col-md-7"> {ele.message} </span>
                          </div>
                        </li>
                        <li class="list-group-item">
                          {loading && messageId === ele._id ? (
                            <div>
                              <span>Deleting</span>
                              <div
                                className="spinner-border text-danger"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          ) : (
                            <button
                              className="btn btn-outline-danger float-end"
                              onClick={() => handleMessageDelete(ele._id)}
                            >
                              Delete
                            </button>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })
            ) : (
              <h5 class="card-title">No Messages Found!</h5>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
