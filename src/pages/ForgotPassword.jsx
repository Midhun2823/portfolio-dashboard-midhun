import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "@/store/slices/forgotResetPasswordSlice";
import { toast } from "react-toastify";
import { clearAllForgotPasswordErrors } from "../store/slices/forgotResetPasswordSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigateTo = useNavigate();
  const handleForgotPassword = () => {
    dispatch(forgotPassword(email));
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
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <>
      <div className="pt-5 row mt-2">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="text-center fw-bolder">Forgot Password</h1>
          <p className="fw-medium text-center ">
            Enter your email to request for reset password
          </p>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              id="email"
              className="form-control"
              type="email"
              placeholder="ssh@innovations.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 ">
            <Link className="float-end" to={"/login"}>
              Remember your password?
            </Link>
          </div>
          {loading ? (
            <div>
              <span>Requesting</span>
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <button
              className="form-control btn btn-danger"
              onClick={handleForgotPassword}
            >
              Request For Reset Password
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
