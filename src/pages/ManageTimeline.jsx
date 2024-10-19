import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resetTimelineSlice,
} from "../store/slices/timelineSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ManageTimeline = () => {
  const { loading, message, error, timeline } = useSelector(
    (state) => state.timeline
  );
  const dispatch = useDispatch();

  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
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
  }, [dispatch, loading, error, message]);

  return (
    <>
      <div className="container-fluid m-1">
        <div className="card p-2">
          <div className="card-title">
            <span className="h2 text-decoration-underline">Manage Your Timeline</span>
            <Link to={"/"}>
              {" "}
              <button className="btn btn-dark float-end">
                Return to Dashboard
              </button>
            </Link>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {timeline && timeline.length > 0 ? (
                  timeline.map((ele) => {
                    return (
                      <tr key={ele._id}>
                        <th scope="row">{ele.title}</th>
                        <th scope="row">{ele.description}</th>
                        <td>{ele.timeline.from}</td>
                        <td>
                          {ele.timeline.to ? `${ele.timeline.to}` : "Present"}
                        </td>
                        <td>
                          <button className="btn btn-outline-dark border border-danger border-2 float-end" onClick={() => handleDeleteTimeline(ele._id)}>
                           <img width={32} src="/Delete_Icon.png" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colspan="5" className="text-center lead">
                      No Timeline To Show
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageTimeline;
