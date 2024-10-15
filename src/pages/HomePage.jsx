import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, logout } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../assets/Portfolio_Icon.png";
import Dashboard from "./sub-components/Dashboard";
import AddProject from "./sub-components/AddProject";
import AddTimeline from "./sub-components/AddTimeline";
import AddSkills from "./sub-components/AddSkills";
import AddApplication from "./sub-components/AddApplication";
import Messages from "./sub-components/Messages";
import Account from "./sub-components/Account";

const HomePage = () => {
  // This is used for which component is active
  const [active, setActive] = useState("Dashboard");

  const { isAuthenticated, error, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  };

  const navigateTo = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="mb-4">
      <div >
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <img
              className="navbar-brand w-2 rounded"
              href="#"
              src={Icon}
              width={32}
            />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      active === "Dashboard"
                        ? "active text-decoration-underline"
                        : ""
                    }`}
                    aria-current="page"
                    onClick={() => setActive("Dashboard")}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      active === "Add Project"
                        ? "active text-decoration-underline"
                        : ""
                    }`}
                    aria-current="page"
                    onClick={() => setActive("Add Project")}
                  >
                    Add Project
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      active === "Add Application"
                        ? "active text-decoration-underline"
                        : ""
                    }`}
                    aria-current="page"
                    onClick={() => setActive("Add Application")}
                  >
                    Add Application
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      active === "Add Timeline"
                        ? "active text-decoration-underline"
                        : ""
                    }`}
                    aria-current="page"
                    onClick={() => setActive("Add Timeline")}
                  >
                    Add Timeline
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      active === "Messages"
                        ? "active text-decoration-underline"
                        : ""
                    }`}
                    aria-current="page"
                    onClick={() => setActive("Messages")}
                  >
                    Messages
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      active === "Account"
                        ? "active text-decoration-underline"
                        : ""
                    }`}
                    aria-current="page"
                    onClick={() => setActive("Account")}
                  >
                    Account
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2 "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <Link
                  className="btn btn-outline-success"
                  type="submit"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </form>
            </div>
          </div>
        </nav>
        <div>
          <img
            src={user && user.avatar && user.avatar.url}
            alt="avatar"
            className="rounded"
            width={102}
            height={132}
          />
          <span className="display-6">Welcome {user.fullName}</span>
        </div>
      </div>
      {(() => {
        switch (active) {
          case "Dashboard":
            return <Dashboard />;
          case "Add Project":
            return <AddProject />;
          case "Add Skills":
            return <AddSkills />;
          case "Add Application":
            return <AddApplication />;
          case "Add Timeline":
            return <AddTimeline />;
          case "Messages":
            return <Messages />;
          case "Account":
            return <Account />;

          default:
            return <Dashboard />;
        }
      })()}
    </div>
  );
};

export default HomePage;
