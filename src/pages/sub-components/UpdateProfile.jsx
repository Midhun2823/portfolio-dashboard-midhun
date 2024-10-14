import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "../../store/slices/userSlice";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
  const [linkedInURL, setLinkedInURL] = useState(
    user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL)
  );
  const [githubURL, setGithubURL] = useState(
    user && (user.githubURL === "undefined" ? "" : user.githubURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [twitterURL, setTwitterURL] = useState(
    user && (user.twitterURL === "undefined" ? "" : user.twitterURL)
  );
  const [facebookURL, setFacebookURL] = useState(
    user && (user.facebookURL === "undefined" ? "" : user.facebookURL)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("portfolioURL", portfolioURL);
    formData.append("aboutMe", aboutMe);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("facebookURL", facebookURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
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
    <>
      <div className="mb-5">
        <div>
          <div>
            <h1>Update Profile</h1>
            <p>Update Your Profile</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Profile Image</label>
            <br />
            <img
              src={avatarPreview ? avatarPreview : "./Portfolio_Icon.png"}
              alt="avatar"
              width={102}
              height={132}
              className="m-2"
            />
            <input
              type="file"
              className="btn btn-outline-dark"
              onChange={avatarHandler}
            />
          </div>
          <div className="col-md-6">
            <label>Resume</label>
            <br />
            <Link to={user && user.resume && user.resume.url} target="_blank">
              <img
                src={resumePreview ? resumePreview : "./Portfolio_Icon.png"}
                alt="resume"
                width={102}
                height={132}
                className="m-2"
              />
            </Link>
            <input
              type="file"
              className="btn btn-outline-dark"
              onChange={resumeHandler}
            />
          </div>
        </div>
        <div className="mt-2">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Your Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="Your Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label>About Me</label>
          <textarea
            className="form-control"
            placeholder="About Me"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label>Portfolio URL</label>
          <input
            className="form-control"
            placeholder="Your Portfolio URL"
            value={portfolioURL}
            onChange={(e) => setPortfolioURL(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label>Github URL</label>
          <input
            className="form-control"
            placeholder="Your Github URL"
            value={githubURL}
            onChange={(e) => setGithubURL(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label>LinkedIn URL</label>
          <input
            className="form-control"
            placeholder="Your LinkedIn URL"
            value={linkedInURL}
            onChange={(e) => setLinkedInURL(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label>Instagram URL</label>
          <input
            className="form-control"
            placeholder="Your Instagram URL"
            value={instagramURL}
            onChange={(e) => setInstagramURL(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label>Twitter(X) URL</label>
          <input
            className="form-control"
            placeholder="Your Twitter(X) URL"
            value={twitterURL}
            onChange={(e) => setTwitterURL(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label>Facebook URL</label>
          <input
            className="form-control"
            placeholder="Your Facebook URL"
            value={facebookURL}
            onChange={(e) => setFacebookURL(e.target.value)}
          />
        </div>
        <div className="mt-2">
          {!loading ? (
            <button
              onClick={handleUpdateProfile}
              className="form-control btn btn-outline-dark"
            >
              Update Profile
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
    </>
  );
};

export default UpdateProfile;
