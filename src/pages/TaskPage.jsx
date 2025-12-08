import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskPage = () => {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [taskFilter, setTaskFilter] = useState("All");

    // All dropdown states
    const [projects, setProjects] = useState([]);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [tags, setTags] = useState([]);

    // Form states
    const [name, setName] = useState("");
    const [projectId, setProjectId] = useState("");
    const [teamId, setTeamId] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [tagId, setTagId] = useState("");
    const [status, setStatus] = useState("To Do");
    const [time, setTime] = useState("");

    // Filter tasks
    const filterTaskStatus = tasks.filter((t) =>
        taskFilter === "All" ? true : t.status === taskFilter
    );

    // Fetch tasks
    const fetchTasks = async () => {
        try {
            const response = await axios.get("https://workasana-backend-repo.vercel.app/tasks");
            setTasks(response.data);
        } catch (error) {
            console.log("Error fetching tasks:", error);
        }
    };

    // Fetch all dropdown data
    const fetchDropdownData = async () => {
        try {
            const p = await axios.get("https://workasana-backend-repo.vercel.app/projects");
            const t = await axios.get("https://workasana-backend-repo.vercel.app/teams");
            const u = await axios.get("https://workasana-backend-repo.vercel.app/users");
            const tg = await axios.get("https://workasana-backend-repo.vercel.app/tags");

            setProjects(p.data || []);
            setTeams(t.data || []);
            setUsers(u.data.data || []);
            setTags(tg.data || []);
        } catch (err) {
            console.log("Error fetching dropdown:", err);
        }
    };

    // Create new task
    const handleCreateTask = async () => {
        try {
            const body = {
               name,
                project: projectId,
                team: teamName,
                owners: [ownerId],
                tags: [tagName],
                status,
                timeToComplete: Number(time),
            };

            await axios.post("https://workasana-backend-repo.vercel.app/tasks", body);

            fetchTasks(); // refresh list
            toast.success("Task Added Successfully...")

            // Reset
            setName("");
            setProjectId("");
            setTeamId("");
            setOwnerId("");
            setTagId("");
            setStatus("To Do");
            setTime("");

            document.querySelector("#taskModal .btn-close").click();

        } catch (err) {
            console.log("Error creating task:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchDropdownData();
    }, []);

    return (
        <div className="container-fluid mt-4">
            <ToastContainer position="top-right" autoClose={2000} />
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold m-0">Project: Website Redesign</h3>

                <Link to="/dashboard" className="btn btn-outline-secondary">
                    ← Back to Dashboard
                </Link>
            </div>

            {/* FILTER + TOP BAR */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body d-flex flex-wrap align-items-center gap-3">

                    {/* MENU BUTTONS */}
                    {/* <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary active">Tasks</button>
                        <button className="btn btn-outline-primary">Overview</button>
                        <button className="btn btn-outline-primary">Members</button>
                        <button className="btn btn-outline-primary">Files</button>
                    </div> */}

                    <div className="vr"></div>

                    {/* FILTERS */}
                    <select className="form-select w-auto"
                        value={taskFilter}
                        onChange={(e) => setTaskFilter(e.target.value)}
                    >
                        <option value="All">Filter: All</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <div className="ms-auto"></div>

                    {/* ADD TASK BUTTON */}
                    <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#taskModal"
                    >
                        + Add Task
                    </button>
                </div>
            </div>

            {/* TASK TABLE */}
            <div className="card shadow-sm border-0">
                <div className="card-body">

                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Task Name</th>
                                <th>Status</th>
                                <th>Owner</th>
                                <th>Created On</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {filterTaskStatus.map((task) => (
                                <tr key={task._id} className="table-row-hover">

                                    <td className="fw-semibold">{task.name}</td>

                                    <td>
                                        <span className={`badge px-3 py-2 
                                            ${task.status === "Completed" ? "bg-success" :
                                                task.status === "In Progress" ? "bg-info" :
                                                    task.status === "To Do" ? "bg-secondary" :
                                                        "bg-warning text-dark"}`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>

                                    <td>{task?.owners?.[0]?.name || "No Owner"}</td>
                                    <td>{new Date(task.createdAt).toLocaleDateString()}</td>

                                    <td
                                        className="text-primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate(`/tasks/${task._id}`)}
                                    >
                                        <FaArrowRight size={18} />
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            </div>

            {/* ================== MODAL ================== */}
            <div className="modal fade" id="taskModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Create New Task</h5>
                            <button
                                id="closeTaskModal"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">

                            <form className="row g-3">

                                {/* Task Name */}
                                <div className="col-12">
                                    <label className="fw-semibold">Task Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                {/* PROJECT */}
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

                                {/* TEAM */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Team</label>
                                    <select
                                        className="form-select"
                                        value={teamId}
                                        onChange={(e) => setTeamId(e.target.value)}
                                    >
                                        <option value="">Select Team</option>
                                        {teams.map((t) => (
                                            <option key={t._id} value={t._id}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* OWNER */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Owner</label>
                                    <select
                                        className="form-select"
                                        value={ownerId}
                                        onChange={(e) => setOwnerId(e.target.value)}
                                    >
                                        <option value="">Select Owner</option>
                                        {users.map((u) => (
                                            <option key={u._id} value={u._id}>{u.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* TAG */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Tag</label>
                                    <select
                                        className="form-select"
                                        value={tagId}
                                        onChange={(e) => setTagId(e.target.value)}
                                    >
                                        <option value="">Select Tag</option>
                                        {tags.map((tg) => (
                                            <option key={tg._id} value={tg._id}>{tg.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* STATUS */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Status</label>
                                    <select
                                        className="form-select"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="To Do">To Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>

                                {/* TIME */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Time (Days)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </div>

                            </form>

                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button className="btn btn-primary" onClick={handleCreateTask}>
                                Create Task
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default TaskPage;
