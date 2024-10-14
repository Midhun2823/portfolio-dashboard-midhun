import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "@/store/slices/forgotResetPasswordSlice";
import { toast } from "react-toastify";
import { clearAllForgotPasswordErrors } from "../store/slices/forgotResetPasswordSlice";
import { getUser } from "@/store/slices/userSlice";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigateTo = useNavigate();

  const handleResetPassword = () => {
    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message !== null) {
      toast.success(message);
      dispatch(getUser())
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <>
      <div className="pt-5 row mt-2">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="text-center fw-bolder">Reset Password</h1>
          <p className="fw-medium text-center ">Set a new password</p>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {loading ? (
            <div>
              <span>Resetting Password</span>
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <button
              className="form-control btn btn-danger"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
