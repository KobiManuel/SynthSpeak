import React, { useState, useEffect } from "react";
import "./Navigation.scss";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      toggleNavigation();
    }, 800);
  }, []);
  const email = "emmakobi91@gmail.com";
  const subject = "Hi, would you be interested in working with me/us?";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  return (
    <nav className={`top-right ${isOpen ? "open" : ""}`}>
      <a
        className={`disc l1 ${isOpen ? "open" : ""}`}
        href="https://twitter.com/KobiManuell"
        target="_blank"
        rel="noreferrer"
      >
        <div>Twitter</div>
      </a>
      <a
        className={`disc l2 ${isOpen ? "open" : ""}`}
        href="https://www.linkedin.com/in/emmanuel-kobi-572b68180/"
        target="_blank"
        rel="noreferrer"
      >
        <div>LinkedIn</div>
      </a>
      <a
        className={`disc l3 ${isOpen ? "open" : ""}`}
        href={mailtoLink}
        target="_blank"
        rel="noreferrer"
      >
        <div>Email</div>
      </a>
      <a
        href="https://docs.google.com/document/d/1NJ8nqD9KPumsMaPehvlMv-WAMziW7qhoPugzdUBL4L0/edit?usp=sharing"
        target="_blank"
        rel="noreferrer"
        className={`disc l4 ${isOpen ? "open" : ""}`}
      >
        <div>Resume</div>
      </a>
      <a
        className={`disc l5 toggle ${isOpen ? "open" : ""}`}
        onClick={toggleNavigation}
      >
        {isOpen ? "Close" : "Menu"}
      </a>
    </nav>
  );
};

export default Navigation;
