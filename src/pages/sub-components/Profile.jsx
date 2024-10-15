import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div>
        <div>
          <div>
            <h1>Profile</h1>
            <p>Full Profile Preview</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Profile Image</label>
            <br />
            <img
              src={user && user.avatar && user.avatar.url}
              alt="avatar"
              width={102}
              height={132}
              className="m-2"
            />
          </div>
          <div className="col-md-6">
            <label>Resume</label>
            <br />
            <img
              src={user && user.resume && user.resume.url}
              alt="avatar"
              width={102}
              height={132}
              className="m-2"
            />
          </div>
        </div>
        <div className="my-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            defaultValue={user.fullName}
            disabled
          />
        </div>
        <div className="my-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            defaultValue={user.email}
            disabled
          />
        </div>
        <div className="my-3">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            defaultValue={user.phone}
            disabled
          />
        </div>
        <div className="my-3">
          <label>About Me</label>
          <textarea
            className="form-control"
            defaultValue={user.aboutMe}
            disabled
          />
        </div>
        <div className="my-3">
          <label>Portfolio URL</label>
          <input
            className="form-control"
            defaultValue={user.portfolioURL}
            disabled
          />
        </div>
        <div className="my-3">
          <label>Github URL</label>
          <input
            className="form-control"
            defaultValue={user.githubURL}
            disabled
          />
        </div>
        <div className="my-3">
          <label>LinkedIn URL</label>
          <input
            className="form-control"
            defaultValue={user.linkedInURL}
            disabled
          />
        </div>
        <div className="my-3">
          <label>Instagram URL</label>
          <input
            className="form-control"
            defaultValue={user.instagramURL}
            disabled
          />
        </div>
        <div className="my-3">
          <label>Twitter(X) URL</label>
          <input
            className="form-control"
            defaultValue={user.twitterURL}
            disabled
          />
        </div>
        <div className="my-3">
          <label>Facebook URL</label>
          <input
            className="form-control"
            defaultValue={user.facebookURL}
            disabled
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
