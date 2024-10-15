import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h1>Settings</h1>
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    selectedComponent === "Profile"
                      ? "active text-decoration-underline"
                      : ""
                  }`}
                  onClick={() => setSelectedComponent("Profile")}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${
                    selectedComponent === "Update Profile"
                      ? "active text-decoration-underline"
                      : ""
                  }`}
                  onClick={() => setSelectedComponent("Update Profile")}
                >
                  Update Profile
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${
                    selectedComponent === "Update Password"
                      ? "active text-decoration-underline"
                      : ""
                  }`}
                  onClick={() => setSelectedComponent("Update Password")}
                >
                  Update Password
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-9">
            {(() => {
              switch (selectedComponent) {
                case "Profile":
                  return <Profile />;
                case "Update Profile":
                  return <UpdateProfile />;
                case "Update Password":
                  return <UpdatePassword />;

                default:
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
