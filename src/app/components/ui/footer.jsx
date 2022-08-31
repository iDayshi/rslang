import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start fixed-bottom">
      <div
        className="text-center p-3 text-black d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "rgba(250, 208, 196, 0.7)" }}
      >
        <div>
          <a
            href="https://rs.school/js/"
            className="footer_logo_school"
            target="_blank"
            rel="noop noreferrer"
          >
            <img
              width="100"
              src="https://rs.school/images/rs_school_js.svg"
            ></img>
          </a>
        </div>
        <div className="h4">© 2022 </div>
        <div className="d-flex">
          <div>
            <a
              href="https://github.com/iDayshi"
              className="footer_logo_school"
              target="_blank"
              rel="noop noreferrer"
            >
              <img
                height="32"
                width="32"
                src="http://cdn.onlinewebfonts.com/svg/img_326384.png"
              ></img>
            </a>
            <span className="p-2">iDayshi</span>
          </div>
          <div>
            <a
              href="https://github.com/Macbaren"
              className="footer_logo_school"
              target="_blank"
              rel="noop noreferrer"
            >
              <img
                height="32"
                width="32"
                src="http://cdn.onlinewebfonts.com/svg/img_326384.png"
              ></img>
            </a>
            <span className="p-2">Macbaren</span>
          </div>
          <div>
            <a
              href="https://github.com/4Quark"
              className="footer_logo_school"
              target="_blank"
              rel="noop noreferrer"
            >
              <img
                height="32"
                width="32"
                src="http://cdn.onlinewebfonts.com/svg/img_326384.png"
              ></img>
            </a>
            <span className="p-2">4Quark</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
