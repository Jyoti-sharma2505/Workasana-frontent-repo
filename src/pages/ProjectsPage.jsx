import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [projectFilter, setProjectFilter]=useState("All");

    const filterProjectStatus= projects.filter((p)=>projectFilter==="All"?true:p.status===projectFilter)

    const fetchProjects = async () => {
        try {
            const response = await fetch("https://workasana-backend-repo.vercel.app/projects");
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.log("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="container-fluid mt-4">

            {/* ---- PAGE HEADER ---- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold m-0">All Projects</h3>

                <Link to="/dashboard" className="btn btn-secondary">
                    ← Back to Dashboard
                </Link>
            </div>

            {/* ==========================  
          TOP FILTER BAR
      =========================== */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body d-flex flex-wrap align-items-center gap-3">

                    {/* Menu Buttons */}
                    {/* <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary active">Tasks</button>
                        <button className="btn btn-outline-primary">Overview</button>
                        <button className="btn btn-outline-primary">Members</button>
                        <button className="btn btn-outline-primary">Files</button>
                    </div> */}

                    {/* Divider */}
                    <div className="vr"></div>

                    {/* Owner Filter */}
                    <select className="form-select w-auto" value={projectFilter} onChange={(e)=>setProjectFilter(e.target.value)}>
                        <option value="All">Filter: All</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    {/* Tag Filter */}
                    {/* <select className="form-select w-auto">
                        <option>Tag: All</option>
                        <option>Urgent</option>
                        <option>Design</option>
                        <option>Client</option>
                    </select> */}

                    {/* Sort By */}
                    {/* <select className="form-select w-auto">
                        <option>Sort: Due Date</option>
                        <option>Priority</option>
                        <option>Status</option>
                    </select> */}

                    {/* Push Add Button Right */}
                    <div className="ms-auto"></div>

                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#projectModal">+ Add New Project</button>
                </div>
            </div>

            {/* ==========================  
              PROJECT TABLE
      =========================== */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Project Name</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {filterProjectStatus.map((project) => (
                                <tr key={project._id}>
                                    <td className="fw-semibold">{project.name}</td>

                                    <td>
                                        <span
                                            className={`badge 
                        ${project.status === "Completed"
                                                    ? "bg-success"
                                                    : project.status === "In Progress"
                                                        ? "bg-info"
                                                        : project.status === "To Do"
                                                            ? "bg-secondary"
                                                            : "bg-warning text-dark"
                                                }
                      `}
                                        >
                                            {project.status}
                                        </span>
                                    </td>

                                    <td>
                                        {project.createdAt
                                            ? new Date(project.createdAt).toLocaleDateString()
                                            : "No Date"}
                                    </td>

                                    <td className="text-primary" style={{ cursor: "pointer" }}>
                                        <FaArrowRight size={18} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
            {/* ////Project model/// */}
            {/* ---- Create Project Modal ---- */}
            <div className="modal fade" id="projectModal" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content shadow-lg">

                        {/* Header */}
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title fw-semibold">Create New Project</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>

                        {/* Body */}
                        <div className="modal-body">
                            <form className="row g-3">

                                {/* Project Name */}
                                <div className="col-12">
                                    <label className="fw-semibold mb-1">Project Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter project name"
                                    />
                                </div>

                                {/* Description */}
                                <div className="col-12">
                                    <label className="fw-semibold mb-1">Project Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Enter project description"
                                    ></textarea>
                                </div>

                                {/* Status */}
                                <div className="col-md-6">
                                    <label className="fw-semibold mb-1">Status</label>
                                    <select className="form-select">
                                        <option>To Do</option>
                                        <option>In Progress</option>
                                        <option>Completed</option>
                                    </select>
                                </div>

                                {/* Priority */}
                                <div className="col-md-6">
                                    <label className="fw-semibold mb-1">Priority</label>
                                    <select className="form-select">
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>

                            </form>
                        </div>

                        {/* Footer */}
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button className="btn btn-primary px-4">Create Project</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    );
};

export default ProjectsPage;
