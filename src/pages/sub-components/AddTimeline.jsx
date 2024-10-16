import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTimeline,
  clearAllTimelineErrors,
  getAllTimeline,
  resetTimelineSlice,
} from "../../store/slices/timelineSlice";
import { toast } from "react-toastify";

const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { loading, error, message } = useSelector((state) => state.timeline);

  const dispatch = useDispatch();

  const handleAddNewTimeline = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);
    dispatch(addNewTimeline(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, message, loading]);

  return (
    <>
      <div className="container row">
        <div className="col-md-3"></div>{" "}
        <div className="col-md-6 ">
          <form onSubmit={handleAddNewTimeline}>
            <div>
              <h2>ADD A NEW TIMELINE</h2>
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Marticulation"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Timeline Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                From
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Starting Period"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label for="exampleInputEmail1" className="form-label">
                To
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Ending Period"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                }}
              />
            </div>
            <div className="text-center">
              {" "}
              {loading ? (
                <div className="mt-5 ">
                  <span className="">Adding</span>
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <button type="submit" className="btn btn-outline-dark mt-5">
                  Add Timeline
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTimeline;
