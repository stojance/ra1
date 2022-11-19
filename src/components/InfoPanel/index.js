import React from "react";
import "./index.css";

export default function InfoPanen({ title, children }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <section className="InfoPanel">
      <a onClick={() => setIsOpen((v) => !v)} href="#">
        {isOpen ? <span className="fa fa-sort-up"></span> : <span className="fa fa-sort-down"></span>}
        {' '}
        {title}
      </a>
      <div
        className={`InfoPanel-details ${
          isOpen ? "" : "InfoPanel-details-closed"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
