import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProject,
  clearAllProjectSliceErrors,
  getAllProjects,
  resetProjectSlice,
} from "../../store/slices/projectSlice";
import { toast } from "react-toastify";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const handleProjectBanner = (e) => {
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

  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const handleAddNewProject = (e) => {
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
    dispatch(addNewProject(formData));
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
      <div className="container row">
        <div className="col-md-3"></div>{" "}
        <div className="col-md-6 ">
          <form onSubmit={handleAddNewProject}>
            <div className="text-center text-decoration-underline">
              <h2>ADD A NEW PROJECT</h2>
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

            <div className="mb-3">
              <label className="form-label">Project Banner</label> <br />
              <div className="border rounded text-center py-3">
                {projectBannerPreview ? (
                  <img
                    src={
                      projectBannerPreview
                        ? `${projectBannerPreview}`
                        : "/PhotoIcon.png"
                    }
                    width="100%"
                    height={300}
                  />
                ) : (
                  <img
                    src="/PhotoIcon.png"
                    className="m-4"
                    width={102}
                    height={102}
                  />
                )}
                <br />
                <input
                  // id="file-upload"
                  // name="file-upload"
                  type="file"
                  className="btn btn-outline-dark mt-2"
                  onChange={handleProjectBanner}
                />
              </div>
            </div>

            <div className="text-center">
              {loading ? (
                <div className="mt-5 ">
                  <span className="">Adding</span>
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <button type="submit" className="btn btn-outline-dark mt-3">
                  Add Project
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProject;
