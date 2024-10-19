import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteSoftwareApplication,
  resetApplicationSlice,
  getAllSoftwareApplications,
  clearAllApplicationSliceErrors,
} from "@/store/slices/softwareApplicationSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);

  const { softwareApplications, error, loading, message } = useSelector(
    (state) => state.application
  );

  const { timeline } = useSelector((state) => state.timeline);

  const dispatch = useDispatch();

  const [appId, setAppId] = useState("");
  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
  }, [dispatch, error, message, loading]);

  return (
    <>
      <div className="mx-1">
        <div className="contatiner-fluid row ">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <p className="card-text">{user.aboutMe}</p>
                <Link
                  to={user.portfolioURL && user.portfolioURL}
                  target="_blank"
                >
                  <button className="btn btn-dark">Vist Portfolio</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Projects Completed</h5>
                <p className="card-text h1">{projects && projects.length}</p>
                <Link to={"/manage/projects"}>
                  <button className="btn btn-dark">Manage Projects</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Skills</h5>
                <p className="card-text h1">{skills && skills.length}</p>
                <Link to={"/manage/skills"}>
                  <button className="btn btn-dark">Manage Skills</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card mt-3 p-3">
              <h4 className="text-decoration-underline">Projects</h4>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Stack</th>
                    <th scope="col">Deployed</th>
                    <th scope="col">Update</th>
                    <th scope="col">Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {projects && projects.length > 0 ? (
                    projects.map((ele) => {
                      return (
                        <tr key={ele._id}>
                          <th scope="row">{ele.title}</th>
                          <td>{ele.stack}</td>
                          <td>{ele.deployed}</td>
                          <td>
                            <Link to={`/update/project/${ele._id}`}>
                              <button className="btn btn-dark">Update</button>
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={ele.projectLink ? `${ele.projectLink}` : ""}
                              target="_blank"
                            >
                              <button className="btn btn-dark">Visit</button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colspan="5" className="text-center lead">
                        No Projects To Show
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card mt-3 p-3">
              <h4 className=" text-decoration-underline">Skills</h4>
              <div className="row">
                {(skills && skills.length) > 0 ? (
                  skills.map((ele) => {
                    return (
                      <div className="col-md-6">
                        <div className="my-2 p-2 card" key={ele._id}>
                          <p className="card-title h4">{ele.title}</p>
                          <div
                            class="progress"
                            role="progressbar"
                            aria-label="Success example"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              class="progress-bar bg-dark"
                              style={{ width: `${ele.proficiency}%` }}
                            >
                              {ele.proficiency}%
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center lead">No Skills To Show</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mt-3 p-3 h-100">
              <h4 className="text-decoration-underline">
                Software Application
              </h4>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Icon</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {softwareApplications && softwareApplications.length > 0 ? (
                    softwareApplications.map((ele) => {
                      return (
                        <tr key={ele._id}>
                          <th scope="row">{ele.name}</th>
                          <td>
                            <img
                              width={32}
                              height={32}
                              src={ele.svg && ele.svg.url}
                              alt={ele.name}
                            />
                          </td>
                          <td>
                            {loading && appId == ele._id ? (
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
                                onClick={() => handleDeleteSoftwareApp(ele._id)}
                                className="btn btn-dark float-end"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colspan="3" className="text-center lead">
                        No Software Applications To Show
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mt-3 p-3 h-100">
              <div className="">
                <span className="text-decoration-underline h4 ">Timeline</span>
                <Link to={"/manage/timeline"}>
                  {" "}
                  <button className="btn btn-dark float-end">
                    Manage Timeline
                  </button>
                </Link>
              </div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                  </tr>
                </thead>
                <tbody>
                  {timeline && timeline.length > 0 ? (
                    timeline.map((ele) => {
                      return (
                        <tr key={ele._id}>
                          <th scope="row">{ele.title}</th>
                          <td>{ele.timeline.from}</td>
                          <td>
                            {ele.timeline.to ? `${ele.timeline.to}` : "Present"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colspan="3" className="text-center lead">
                        No Timeline To Show
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
