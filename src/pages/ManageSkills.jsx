import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSkill,
  clearAllSkillSliceErrors,
  resetSkillSlice,
  getAllSkills,
} from "@/store/slices/skillSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { updateSkill } from "../store/slices/skillSlice";

const ManageSkills = () => {
  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  );
  const dispatch = useDispatch();

  const [newProficiency, setNewProficiency] = useState(1);
  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };

  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
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
  }, [dispatch, loading, error, message]);

  return (
    <>
      <div className="container-fluid m-1">
        <div className="card p-2">
          <div className="card-title">
            <span className="h2 text-decoration-underline">
              Manage Your Skills
            </span>
            <Link to={"/"}>
              <button className="btn btn-dark float-end">
                Return to Dashboard
              </button>
            </Link>
          </div>
          <div className="card-body ">
            <div className="row">
              {skills && skills.length > 0 ? (
                skills.map((ele) => {
                  return (
                    <div className="col-md-6 " key={ele._id}>
                      <div className="card m-2 pb-2 px-3 pt-3">
                        <div>
                          <span className="h2">{ele.title}</span>
                          <button
                            className="float-end btn btn-outline-dark border border-2 border-danger"
                            onClick={() => handleDeleteSkill(ele._id)}
                          >
                            <img width={32} src="/Delete_Icon.png" />
                          </button>
                        </div>
                        <div className="d-flex">
                          <label className="h4 mt-2 ">Proficiency</label>
                          <input
                            type="number"
                            defaultValue={ele.proficiency}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={() => handleUpdateSkill(ele._id)}
                            className="form-control m-2"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <tr>
                  <td colspan="5" className="text-center lead">
                    No Skills To Show
                  </td>
                </tr>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSkills;
