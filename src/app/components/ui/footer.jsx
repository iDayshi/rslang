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
              <a href="https://github.com/iDayshi" className="github_logo"></a>
              <a href="https://github.com/iDayshi" className="github_name">
                {" "}
                Maksim{" "}
              </a>
            </div>
            <div className="git_person">
              <a href="https://github.com/Macbaren" className="github_logo"></a>
              <a href="https://github.com/Macbaren" className="github_name">
                {" "}
                Andrey{" "}
              </a>
            </div>
            <div className="git_person">
              <a href="https://github.com/4Quark" className="github_logo"></a>
              <a href="https://github.com/4Quark" className="github_name">
                {" "}
                Maria{" "}
              </a>
            </div>
          </div>
          <a>© RSSchool, 2022</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
