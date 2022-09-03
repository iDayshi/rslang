import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer_info_wrapper">
          <a href="https://rs.school/js/" className="RSS_logo">
            RSSchool
          </a>
          <div className="team">
            <div className="git_person">
              <a href="https://github.com/iDayshi" className="github_name">
                <i className="bi bi-github"></i> Maksim{" "}
              </a>
            </div>
            <div className="git_person">
              <a href="https://github.com/Macbaren" className="github_name">
                <i className="bi bi-github"></i> Andrey{" "}
              </a>
            </div>
            <div className="git_person">
              <a href="https://github.com/4Quark" className="github_name">
                <i className="bi bi-github"></i> Maria{" "}
              </a>
            </div>
          </div>
          © RSSchool, 2022
        </div>
      </div>
    </footer>
  );
};

export default Footer;
