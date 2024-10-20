import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewSoftwareApplication,
  clearAllApplicationSliceErrors,
  getAllSoftwareApplications,
  resetApplicationSlice,
} from "../../store/slices/softwareApplicationSlice";

const AddApplication = () => {
  const [name, setName] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvg(file);
      setSvgPreview(reader.result);
    };
  };

  const { loading, error, message } = useSelector((state) => state.application);
  const dispatch = useDispatch();
  const handleAddNewApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("svg", svg);
    dispatch(addNewSoftwareApplication(formData));
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
  }, [dispatch, loading, error]);

  return (
    <>
      <div className="container row">
        <div className="col-md-3"></div>{" "}
        <div className="col-md-6 ">
          <form onSubmit={handleAddNewApplication}>
            <div className="text-center text-decoration-underline">
              <h2>ADD NEW APPLICATION</h2>
            </div>
            <div className="mb-3">
              <label className="form-label">Software Application Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Android Studio"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Software Application's svg:</label>{" "}
              <br />
              <div className="border rounded text-center py-3">
                {svgPreview ? (
                  <img
                    src={svgPreview ? `${svgPreview}` : "/PhotoIcon.png"}
                    width={102}
                    height={132}
                  />
                ) : (
                  <img src="/PhotoIcon.png" width={190} height={190} />
                )}
                <br />
                <input
                  // id="file-upload"
                  // name="file-upload"
                  type="file"
                  className="btn btn-outline-dark"
                  onChange={handleSvg}
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
                <button type="submit" className="btn btn-outline-dark mt-5">
                  Add Application
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddApplication;
