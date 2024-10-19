import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllProjectSliceErrors,
  deleteProject,
  getAllProjects,
  resetProjectSlice,
} from "../store/slices/projectSlice";
import { Link } from "react-router-dom";

const ManageProjects = () => {
  const { loading, projects, error, message } = useSelector(
    (state) => state.project
  );

  const dispatch = useDispatch();

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, loading, error, message]);

  return (
    <>
      <div className="container-fluid m-1">
        <div className="card p-2">
          <div className="card-title">
            <span className="h2 text-decoration-underline">
              Manage Your Timeline
            </span>
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
                  <th scope="col">Banner</th>
                  <th scope="col">Title</th>
                  <th scope="col">Stack</th>
                  <th scope="col">Deployed</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects && projects.length > 0 ? (
                  projects.map((ele) => {
                    return (
                      <tr key={ele._id}>
                        <th scope="row">
                          <div>
                            <img
                              src={ele.projectBanner && ele.projectBanner.url}
                              alt={ele.title}
                              width={32}
                            />
                          </div>
                        </th>
                        <th scope="row">{ele.title}</th>
                        <td>{ele.stack}</td>
                        <td>{ele.deployed}</td>
                        <td>
                          <div className="d-flex">
                            <div className="mx-2">
                              <Link to={`/view/project/${ele._id}`}>
                                {" "}
                                <button
                                  className="btn btn-outline-info border border-danger border-2"
                                  onClick={() => handleDeleteTimeline(ele._id)}
                                >
                                  <img width={32} src="/Eye_Icon.png" />
                                </button>
                              </Link>
                            </div>
                            <div className="mx-2">
                              <Link to={`/update/project/${ele._id}`}>
                                {" "}
                                <button
                                  className="btn btn-outline-warning border border-danger border-2"
                                  onClick={() => handleDeleteTimeline(ele._id)}
                                >
                                  <img width={32} src="/Update_Icon.png" />
                                </button>
                              </Link>
                            </div>
                            <div className="mx-2">
                                {" "}
                                <button
                                  className="btn btn-outline-dark border border-danger border-2"
                                  onClick={() => handleDeleteProject(ele._id)}
                                >
                                  <img width={32} src="/Delete_Icon.png" />
                                </button>
                            </div>
                          </div>
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
      </div>
    </>
  );
};

export default ManageProjects;
