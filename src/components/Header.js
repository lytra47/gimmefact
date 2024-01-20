import React from "react";

function Header({ onIsFormOpen, onSetIsFormOpen }) {
  return (
    <header className="header">
      {/*  LOGO  */}
      <div className="logo">
        <img src="./logo.png" alt="logo" height="50px" width="50px" />
        <h1>Gimme fact</h1>
      </div>
      {/*LOGO - END */}
      <button
        className="btn btn-large btn-open"
        onClick={() => onSetIsFormOpen((value) => !value)}
      >
        {onIsFormOpen ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

export default Header;
