import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllProjectSliceErrors,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from "../store/slices/projectSlice";

const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const { error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const { id } = useParams();

  const handleProjectBannerPreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBanner(file);
      setProjectBannerPreview(reader.result);
    };
  };

  const stackarr = ["MEAN", "MERN", "JAVA", "Python"];
  const handleStack = (event) => {
    setStack(event.target.value);
  };

  const deployarr = ["YES", "NO"];
  const handleDeploy = (event) => {
    setDeployed(event.target.value);
  };

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title),
            setDescription(res.data.project.description),
            setProjectBanner(
              res.data.project.projectBanner &&
                res.data.project.projectBanner.url
            ),
            setProjectBannerPreview(
              res.data.project.projectBanner &&
                res.data.project.projectBanner.url
            ),
            setGitRepoLink(res.data.project.gitRepoLink),
            setProjectLink(res.data.project.projectLink),
            setTechnologies(res.data.project.technologies),
            setStack(res.data.project.stack),
            setDeployed(res.data.project.deployed);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };

    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [id, message, loading, error]);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectBanner", projectBanner);
    dispatch(updateProject(id, formData));
  };

  return (
    <>
      <div className="container row my-4">
        <div className="col-md-2"></div>{" "}
        <div className="col-md-8 ">
          <form onSubmit={handleUpdateProject}>
            <div className=" mb-3">
              <span className="display-6 ">UPDATE PROJECT</span>
              <Link to={"/"} className="float-end btn btn-dark mt-2">
                Return to Dashboard
              </Link>
            </div>
            <div className="mb-3">
              {projectBannerPreview ? (
                <img
                  src={
                    projectBannerPreview
                      ? `${projectBannerPreview}`
                      : "/PhotoIcon.png"
                  }
                  width="100%"
                  height={400}
                />
              ) : (
                <img
                  src="/PhotoIcon.png"
                  width="100%"
                  height={400}
                  className="m-4"
                />
              )}
              <br />
              <input
                // id="file-upload"
                // name="file-upload"
                type="file"
                className="btn btn-outline-dark w-100 mt-2"
                onChange={handleProjectBannerPreview}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Project Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description:</label>
              <textarea
                className="form-control"
                placeholder="Feature 1, 2, 3, 4, 5, 6"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Technologies Used In This Project:
              </label>
              <textarea
                className="form-control"
                placeholder="HTML, CSS, JavaScript, Bootstrap, MERN, MEAN"
                value={technologies}
                onChange={(e) => {
                  setTechnologies(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Stack:</label>

              <select
                class="form-select"
                aria-label="Default select example"
                value={stack}
                onChange={handleStack}
              >
                {" "}
                <option selected>Select Your Stack</option>
                {stackarr.map((eachstack) => (
                  <option key={eachstack} value={eachstack}>
                    {eachstack}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Deployed:</label>
              <select
                className="form-select  mb-3"
                aria-label="Large select example"
                value={deployed}
                onChange={handleDeploy}
              >
                <option selected>Is Project Deployed</option>
                {deployarr.map((eachdeploystage) => (
                  <option key={eachdeploystage} value={eachdeploystage}>
                    {eachdeploystage}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Github Repository Link:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Paste Your Github Repository Link"
                value={gitRepoLink}
                onChange={(e) => {
                  setGitRepoLink(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Project Link:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Paste Your Deployed Project Link"
                value={projectLink}
                onChange={(e) => {
                  setProjectLink(e.target.value);
                }}
              />
            </div>

            <div className="text-center">
              {loading ? (
                <div className="mt-3 ">
                  <span className="">Updating</span>
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <button type="submit" className="btn btn-outline-dark mt-3">
                  Update Project
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProject;
