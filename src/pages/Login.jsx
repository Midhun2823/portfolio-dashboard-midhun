import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAllUserErrors, login } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //useSelector is used for accesing the special reducer or can access entire Slice
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  // state.user means in store the property user

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <div className="pt-5 row mt-2">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <h1 className="text-center fw-bolder">Login</h1>
        <p className="fw-medium text-center ">
          Enter your Login credentials below
        </p>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            id="email"
            className="form-control"
            type="email"
            placeholder="sshinnovations@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Password</label>
          <Link className="float-end" to={"/password/forgot"}>
            Forgot your Password?
          </Link>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loading ? (
          <div>
            <span>Logging In</span>
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <button className="form-control btn btn-danger" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
