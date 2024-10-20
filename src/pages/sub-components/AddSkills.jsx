import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewSkill,
  clearAllSkillSliceErrors,
  getAllSkills,
  resetSkillSlice,
} from "../../store/slices/skillSlice";
import { toast } from "react-toastify";

const AddSkills = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
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

  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  );
  const dispatch = useDispatch();
  const handleAddNewSkill = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("svg", svg);
    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillSliceErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, loading, error]);

  return (
    <>
      <div className="container row">
        <div className="col-md-3"></div>{" "}
        <div className="col-md-6 ">
          <form onSubmit={handleAddNewSkill}>
            <div className="text-center text-decoration-underline">
              <h2>ADD A NEW SKILL</h2>
            </div>
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Skills"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Proficiency:</label>
              <input
                type="number"
                className="form-control"
                placeholder="32"
                value={proficiency}
                onChange={(e) => {
                  setProficiency(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Skill svg:</label> <br />
              <div className="border rounded text-center py-3">
                {svgPreview ? (
                  <img
                    src={svgPreview ? `${svgPreview}` : "/PhotoIcon.png"}
                    width={102}
                    height={102}
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
                  Add Skill
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSkills;
