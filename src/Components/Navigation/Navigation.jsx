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

  return (
    <nav className={`top-right ${isOpen ? "open" : ""}`}>
      <a className={`disc l1 ${isOpen ? "open" : ""}`}>
        <div>Messages</div>
      </a>
      <a className={`disc l2 ${isOpen ? "open" : ""}`}>
        <div>Photos</div>
      </a>
      <a className={`disc l3 ${isOpen ? "open" : ""}`}>
        <div>Profile</div>
      </a>
      <a className={`disc l4 ${isOpen ? "open" : ""}`}>
        <div>Likes</div>
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
