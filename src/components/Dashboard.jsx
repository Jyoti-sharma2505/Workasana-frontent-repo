import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import { CiSearch } from "react-icons/ci";

const Dashboard = () => {

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("To Do");

    const [team, setTeam] = useState([]);
    const [user, setUser] = useState([]);
    const [tags, setTags] = useState([]);

    const [tagName, setTagName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [userName, setUserName] = useState("");
    const [projectId, setProjectId] = useState("");

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    // Fetch all data on load
    useEffect(() => {
        fetchProjects();
        fetchTasks();
        fetchTeams();
        fetchUser();
        fetchTags();
    }, []);

    /** Fetch Projects */
    const fetchProjects = async () => {
        try {
            const res = await axios.get("https://workasana-backend-repo.vercel.app/projects");
            setProjects(res.data);
        } catch (err) {
            console.log("Error fetching projects:", err);
        }
    };

    /** Fetch Tasks */
    const fetchTasks = async () => {
        try {
            const res = await axios.get("https://workasana-backend-repo.vercel.app/tasks");
            setTasks(res.data);
        } catch (err) {
            console.log("Error fetching tasks:", err);
        }
    };

    /** Create Project */
    const handleCreateProject = async () => {
        try {
            const body = { name, description, status };

            await axios.post("https://workasana-backend-repo.vercel.app/projects", body);

            fetchProjects();

            setName("");
            setDescription("");
            setStatus("To Do");

            document.querySelector("#projectModal .btn-close").click();
        } catch (err) {
            console.log("Error creating project:", err);
        }
    };

    /** Create Task — FIXED FULLY */
    const handleCreateTask = async () => {
        try {
            const payload = {
                name,
                project: projectId,       // REQUIRED
                team: teamName,           // REQUIRED
                owners: [userName],       // REQUIRED
                tags: [tagName],
                status,
                timeToComplete: Number(time)
            };

            await axios.post("https://workasana-backend-repo.vercel.app/tasks", payload);

            fetchTasks();

            // Reset all fields
            setName("");
            setProjectId("");
            setTeamName("");
            setUserName("");
            setTagName("");
            setTime("");
            setDate("");
            setStatus("To Do");

            document.querySelector("#taskModal .btn-close").click();

        } catch (err) {
            console.log("Server Error:", err.response?.data || err);
        }
    };

    /** Fetch Teams */
    const fetchTeams = async () => {
        try {
            const res = await axios.get("https://workasana-backend-repo.vercel.app/teams");
            setTeam(res.data);
        } catch (err) {
            console.log("Error fetching teams:", err);
        }
    };

    /** Fetch Users */
    const fetchUser = async () => {
        try {
            const res = await axios.get("https://workasana-backend-repo.vercel.app/users");
            setUser(res.data.data);
        } catch (err) {
            console.log("Error fetching users:", err);
        }
    };

    /** Fetch Tags */
    const fetchTags = async () => {
        try {
            const res = await axios.get("https://workasana-backend-repo.vercel.app/tags");
            setTags(res.data);
        } catch (err) {
            console.log("Error fetching tags:", err);
        }
    };

    return (
        <div>

            {/* NAVBAR */}
            <nav className="navbar bg-body-tertiary px-3 shadow-sm">
                <form className="d-flex w-100">
                    <input className="form-control me-2" type="search" placeholder="Search project or task..." />
                    <button className="btn btn-outline-success" type="submit">
                        <CiSearch size={20} />
                    </button>
                </form>
            </nav>

            {/* PROJECTS SECTION */}
            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3>Projects</h3>
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#projectModal">
                        + New Project
                    </button>
                </div>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {projects.map((project) => (
                        <div className="col" key={project._id}>
                            <div className="card h-100 shadow border-0">
                                <div className="card-header bg-white border-0">
                                    <span className={`badge 
                                        ${project.status === "Completed" ? "bg-success" :
                                            project.status === "In Progress" ? "bg-info" :
                                                "bg-warning text-dark"}`}>
                                        {project.status}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <h5 className="fw-bold">{project.name}</h5>
                                    <p className="text-secondary">{project.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* TASKS SECTION */}
            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>My Tasks</h3>
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#taskModal">
                        + New Task
                    </button>
                </div>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {tasks.map((task) => (
                        <div className="col" key={task._id}>
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="fw-bold">{task.name}</h5>
                                    <p className="text-secondary">
                                        👤 Owner: {task?.owners?.[0]?.name || "No Owner"}
                                    </p>
                                    <span className={`badge 
                                        ${task.status === "Completed" ? "bg-success" :
                                            task.status === "In Progress" ? "bg-info" :
                                                "bg-warning text-dark"}`}>
                                        {task.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* PROJECT MODAL */}
            <div className="modal fade" id="projectModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Create New Project</h5>
                            <button className="btn-close" data-bs-dismiss="modal" />
                        </div>

                        <div className="modal-body">
                            <div className="d-flex flex-column gap-3">

                                <div>
                                    <label className="fw-semibold">Project Name</label>
                                    <input className="form-control" value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                </div>

                                <div>
                                    <label className="fw-semibold">Project Description</label>
                                    <textarea className="form-control" value={description}
                                        onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div>
                                    <label className="fw-semibold">Status</label>
                                    <select className="form-select" value={status}
                                        onChange={(e) => setStatus(e.target.value)}>
                                        <option value="To Do">To Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-primary" onClick={handleCreateProject}>Create</button>
                        </div>

                    </div>
                </div>
            </div>

            {/* TASK MODAL */}
            <div className="modal fade" id="taskModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Create New Task</h5>
                            <button className="btn-close" data-bs-dismiss="modal" />
                        </div>

                        <div className="modal-body">

                            <form className="row g-3">

                                <div className="col-12">
                                    <label className="fw-semibold">Task Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                {/* Project Dropdown */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Project</label>
                                    <select
                                        className="form-select"
                                        value={projectId}
                                        onChange={(e) => setProjectId(e.target.value)}
                                    >
                                        <option value="">Select Project</option>
                                        {projects.map((p) => (
                                            <option key={p._id} value={p._id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Team Dropdown */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Team</label>
                                    <select className="form-select" value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}>
                                        <option value="">Select Team</option>
                                        {team.map((t) => (
                                            <option key={t._id} value={t._id}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Owners */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Owners</label>
                                    <select className="form-select" value={userName}
                                        onChange={(e) => setUserName(e.target.value)}>
                                        <option value="">Select Owner</option>
                                        {user.map((own) => (
                                            <option key={own._id} value={own._id}>{own.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tags */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Tags</label>
                                    <select className="form-select" value={tagName}
                                        onChange={(e) => setTagName(e.target.value)}>
                                        <option value="">Select Tag</option>
                                        {tags.map((tag) => (
                                            <option key={tag._id} value={tag._id}>{tag.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Status */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Status</label>
                                    <select className="form-select" value={status}
                                        onChange={(e) => setStatus(e.target.value)}>
                                        <option value="To Do">To Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>

                                {/* Time */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Time (Days)</label>
                                    <input type="number" className="form-control"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)} />
                                </div>

                            </form>

                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-primary" onClick={handleCreateTask}>Create Task</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
