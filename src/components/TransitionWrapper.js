import React from "react";

const TransitionWrapper = ({ children, direction }) => {
  const transitionClass =
    direction === "forward" ? "slide-left" : "slide-right";

  return <div className={`page-transition ${transitionClass}`}>{children}</div>;
};

export default TransitionWrapper;
