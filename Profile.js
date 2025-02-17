
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editable, setEditable] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setUpdatedName(parsedUser.name);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const handleSave = () => {
    const updatedUser = { ...userData, name: updatedName };
    if (updatedPassword) {
      updatedUser.password = updatedPassword;
    }
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUserData(updatedUser);
    setEditable(false);
    alert("Profile updated successfully!");
  };

  // Close button handler
  const handleClose = () => {
    navigate("/"); // Navigate to the home page or any desired page
  };

  return (
    <div className="profile-container" style={{ position: "relative", padding: "20px" }}>
      {/* Close button */}
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
        }}
        title="Close"
      >
        ✖
      </button>

      <h1 className="profile-heading">Profile</h1>
      <div className="profile-details">
        <p>
          <strong>Name:</strong>{" "}
          {editable ? (
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="profile-input"
            />
          ) : (
            userData.name
          )}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        {editable && (
          <p>
            <strong>New Password:</strong>
            <input
              type="password"
              value={updatedPassword}
              onChange={(e) => setUpdatedPassword(e.target.value)}
              className="profile-input"
            />
          </p>
        )}
      </div>
      <div className="profile-actions">
        {editable ? (
          <>
            <button className="profile-btn" onClick={handleSave}>
              Save
            </button>
            <button className="profile-btn" onClick={handleEditToggle}>
              Cancel
            </button>
          </>
        ) : (
          <button className="profile-btn" onClick={handleEditToggle}>
            Edit Profile
          </button>
        )}
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
