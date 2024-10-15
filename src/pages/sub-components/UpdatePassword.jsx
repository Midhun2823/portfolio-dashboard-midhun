import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, getUser, resetProfile, updatePassword } from "../../store/slices/userSlice";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <div>
      <div className="mb-5">
        <div>
          <div>
            <h1>Update Password</h1>
            <p>Update Your Dashboard Password</p>
          </div>
        </div>

        <div className="my-3">
          <label>Current Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="my-3">
          <label>New Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="my-3">
          <label>Confirm New Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <div className="mt-2">
          {!loading ? (
            <button
              onClick={handleUpdatePassword}
              className="form-control btn btn-outline-dark mt-2"
            >
              Update Password
            </button>
          ) : (
            <div className="text-center my-4">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="">Updating......</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
