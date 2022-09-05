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
    <div className="dropdown " onClick={toggleMenu}>
      <div className="btn border border-white border-2 dropdown-toggle d-flex align-items-center ">
        <div className="text-black me-2">{currentUser.name}</div>
        <img
          src={currentUser.avatar}
          height={40}
          alt="avatar"
          className="img-responsive rounded-circle"
        />
      </div>
      <div
        style={{ position: "absolute" }}
        className={
          "w-100 text-black sandwich dropdown-menu" + (isOpen ? " show" : "")
        }
      >
        <Link to={`/statistic`} className="dropdown-item">
          Статистика
        </Link>
        <Link to={`/logout`} className="text-danger dropdown-item">
          Выйти
        </Link>
      </div>
    </div>
  );
};

export default NavProfole;
