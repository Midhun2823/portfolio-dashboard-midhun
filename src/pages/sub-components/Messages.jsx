import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const { loading, messages, error, message } = useSelector(
    (state) => state.messages
  );

  const [messageId, setMessageId] = useState("");

  return (
    <>
      <div className="m-3 p-3">
        <div class="card">
          <div class="card-header">
            <span className="fs-4">Messages</span>
            <button
              onClick={handleReturnToDashboard}
              className="float-end btn btn-outline-dark"
            >
              Return to Dashboard
            </button>
          </div>
          <div class="card-body">
            {messages && messages.length > 0 ? (
              messages.map((ele) => {
                return (
                  <div key={ele._id} className="row">
                    <h5 class="col-md-6 card-title">Sender Name:</h5>
                    <p class="col-md-6 card-text">
                     {ele.senderName}
                    </p>
                    <h5 class="col-md-6 card-title">Subject:</h5>
                    <p class="col-md-6 card-text">
                     {ele.subject}
                    </p>
                    <h5 class="col-md-6 card-title">Message:</h5>
                    <p class="col-md-6 card-text">
                     {ele.message }
                    </p>
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
