import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavProfole = () => {
  const { currentUser } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn btn-secondary dropdown-toggle d-flex align-items-center">
        <div className="text-light me-2">{currentUser.name}</div>
        <img
          src={currentUser.avatar}
          height={40}
          alt=""
          className="img-responsive rounded-circle"
        />
      </div>
      <div
        className={"w-100 text-light dropdown-menu" + (isOpen ? " show" : "")}
      >
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to={`/logout`} className="text-danger dropdown-item">
          Exit
        </Link>
      </div>
    </div>
  );
};

export default NavProfole;
