import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ResponsiveSidebar = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      
      <div
        className="d-flex flex-column p-3 bg-dark text-white shadow"
        style={{ width: "260px" }}
      >
        <h3 className="text-center mb-4 fw-bold">Workasana</h3>

        <ul className="nav nav-pills flex-column gap-2">

          {/* Dashboard */}
          <li className="nav-item">
            <NavLink className="nav-link text-white d-flex align-items-center gap-2" to="/dashboard">
              <i className="bi bi-speedometer2" style={{ color: "#0dcaf0" }}></i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* Projects */}
          <li className="nav-item">
            <NavLink className="nav-link text-white d-flex align-items-center gap-2" to="/projects">
              <i className="bi bi-folder-fill" style={{ color: "#ffc107" }}></i>
              <span>Projects</span>
            </NavLink>
          </li>

          {/* Tasks */}
          <li className="nav-item">
            <NavLink className="nav-link text-white d-flex align-items-center gap-2" to="/tasks">
              <i className="bi bi-list-check" style={{ color: "#0d6efd" }}></i>
              <span>Tasks</span>
            </NavLink>
          </li>

          {/* Teams */}
          <li className="nav-item">
            <NavLink className="nav-link text-white d-flex align-items-center gap-2" to="/teams">
              <i className="bi bi-people-fill" style={{ color: "#20c997" }}></i>
              <span>Teams</span>
            </NavLink>
          </li>

          {/* Reports */}
          <li className="nav-item">
            <NavLink className="nav-link text-white d-flex align-items-center gap-2" to="/reports">
              <i className="bi bi-bar-chart-line-fill" style={{ color: "#fd7e14" }}></i>
              <span>Reports</span>
            </NavLink>
          </li>

          {/* Settings */}
          <li className="nav-item">
            <NavLink className="nav-link text-white d-flex align-items-center gap-2" to="/settings">
              <i className="bi bi-gear-fill" style={{ color: "#6f42c1" }}></i>
              <span>Settings</span>
            </NavLink>
          </li>

        </ul>

        <div className="mt-auto text-center">
          <small className="text-secondary">© 2025 Workasana</small>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveSidebar;
