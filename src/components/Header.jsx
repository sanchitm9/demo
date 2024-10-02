import React, { useState } from "react";

export default function Header({ grouping, sorting, setGrouping, setSorting }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="display-dropdown">
        <button className="display-button" onClick={() => setIsOpen(!isOpen)}>
          <span className="icon">☰</span>
          Display
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <div className="dropdown-item">
              <label htmlFor="grouping">Grouping</label>
              <select
                id="grouping"
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <label htmlFor="sorting">Ordering</label>
              <select
                id="sorting"
                value={sorting}
                onChange={(e) => setSorting(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
