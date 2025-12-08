import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SettingPage() {

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [team, setTeam] = useState([]);
    const [user, setUser] = useState([]);
    const [tags, setTags] = useState([]);

    // PROJECT FORM
    const [projectForm, setProjectForm] = useState({
        name: "",
        description: "",
        status: "To Do"
    });

    // TASK FORM
    const [taskForm, setTaskForm] = useState({
        name: "",
        projectId: "",
        teamId: "",
        ownerId: "",
        tagId: "",
        status: "To Do",
        timeToComplete: ""
    });

    const [editProjectId, setEditProjectId] = useState(null);
    const [editTaskId, setEditTaskId] = useState(null);

    // FETCH ALL DATA
    const fetchData = async () => {
        try {
            const p = await axios.get("https://workasana-backend-repo.vercel.app/projects");
            const t = await axios.get("https://workasana-backend-repo.vercel.app/tasks");
            const tm = await axios.get("https://workasana-backend-repo.vercel.app/teams");
            const u = await axios.get("https://workasana-backend-repo.vercel.app/users");
            const tg = await axios.get("https://workasana-backend-repo.vercel.app/tags");

            setProjects(p.data);
            setTasks(t.data);
            setTeam(tm.data);
            setUser(u.data.data);
            setTags(tg.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { fetchData(); }, []);

    // CREATE / UPDATE PROJECT
    const handleCreateProject = async () => {
        try {
            if (editProjectId) {
                await axios.post(
                    `https://workasana-backend-repo.vercel.app/projects/${editProjectId}`,
                    projectForm
                );
                toast.success("Project updated!");
            } else {
                await axios.post(
                    "https://workasana-backend-repo.vercel.app/projects",
                    projectForm
                );
                toast.success("Project added!");
            }

            fetchData();
            setProjectForm({ name: "", description: "", status: "To Do" });
            setEditProjectId(null);
        } catch (e) {
            toast.error("Error while saving project");
        }
    };

    // CREATE / UPDATE TASK
    const handleCreateTask = async () => {
        try {
            if (editTaskId) {
                await axios.post(
                    `https://workasana-backend-repo.vercel.app/tasks/${editTaskId}`,
                    taskForm
                );
                toast.success("Task updated!");
            } else {
                await axios.post(
                    "https://workasana-backend-repo.vercel.app/tasks",
                    taskForm
                );
                toast.success("Task added!");
            }

            fetchData();
            setTaskForm({
                name: "",
                projectId: "",
                teamId: "",
                ownerId: "",
                tagId: "",
                status: "To Do",
                timeToComplete: ""
            });
            setEditTaskId(null);
        } catch (e) {
            toast.error("Error while saving task");
        }
    };

    // DELETE PROJECT
    const handleDeleteProject = async (id) => {
        await axios.delete(`https://workasana-backend-repo.vercel.app/project/${id}`);
        fetchData();
        toast.success("Project deleted!");
    };

    // DELETE TASK
    const handleDeleteTask = async (id) => {
        await axios.delete(`https://workasana-backend-repo.vercel.app/tasks/${id}`);
        fetchData();
        toast.success("Task deleted!");
    };

    return (
        <div className="container py-4">
            <ToastContainer />

            <h2 className="fw-bold mb-4 text-center">Project & Task Manager</h2>

            {/* PROJECT SECTION */}
            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white d-flex justify-content-between">
                    <h5 className="m-0">Projects</h5>
                    <button className="btn btn-light btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#projectModal">
                        + Add Project
                    </button>
                </div>

                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((p) => (
                                <tr key={p._id}>
                                    <td>{p.name}</td>
                                    <td>
                                        <span className={`badge ${p.status === "Completed"
                                            ? "bg-success"
                                            : p.status === "In Progress"
                                                ? "bg-info"
                                                : "bg-secondary"
                                            }`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td>{p.description}</td>

                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#projectModal"
                                            onClick={() => {
                                                setProjectForm(p);
                                                setEditProjectId(p._id);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteProject(p._id)}
                                        >
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* TASK SECTION */}
            <div className="card shadow mb-4">
                <div className="card-header bg-success text-white d-flex justify-content-between">
                    <h5 className="m-0">Tasks</h5>
                    <button className="btn btn-light btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#taskModal">
                        + Add Task
                    </button>
                </div>

                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((t) => (
                                <tr key={t._id}>
                                    <td>{t.name}</td>
                                    <td><span className="badge bg-secondary">{t.status}</span></td>
                                    <td>{t.timeToComplete}</td>

                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#taskModal"
                                            onClick={() => {
                                                setTaskForm(t);
                                                setEditTaskId(t._id);
                                            }}
                                        >Edit</button>

                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteTask(t._id)}
                                        >Delete</button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PROJECT MODAL */}
            <div className="modal fade" id="projectModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">
                                {editProjectId ? "Edit Project" : "Add Project"}
                            </h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <input
                                type="text"
                                placeholder="Project Name"
                                className="form-control mb-2"
                                value={projectForm.name}
                                onChange={(e) =>
                                    setProjectForm({ ...projectForm, name: e.target.value })}
                            />

                            <textarea
                                placeholder="Description"
                                className="form-control mb-2"
                                value={projectForm.description}
                                onChange={(e) =>
                                    setProjectForm({ ...projectForm, description: e.target.value })}
                            />

                            <select
                                className="form-select"
                                value={projectForm.status}
                                onChange={(e) =>
                                    setProjectForm({ ...projectForm, status: e.target.value })}
                            >
                                <option>To Do</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-primary"
                                onClick={handleCreateProject}
                                data-bs-dismiss="modal">
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* TASK MODAL */}
            <div className="modal fade" id="taskModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title">{editTaskId ? "Edit Task" : "Create Task"}</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <form className="row g-3">

                                {/* NAME */}
                                <div className="col-12">
                                    <label className="fw-semibold">Task Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={taskForm.name}
                                        onChange={(e) =>
                                            setTaskForm({ ...taskForm, name: e.target.value })}
                                    />
                                </div>

                                {/* PROJECT */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Project</label>
                                    <select
                                        className="form-select"
                                        value={taskForm.projectId}
                                        onChange={(e) =>
                                            setTaskForm({ ...taskForm, projectId: e.target.value })}
                                    >
                                        <option value="">Select Project</option>
                                        {projects.map((p) => (
                                            <option key={p._id} value={p._id}>
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* TEAM */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Team</label>
                                    <select
                                        className="form-select"
                                        value={taskForm.teamId}
                                        onChange={(e) =>
                                            setTaskForm({ ...taskForm, teamId: e.target.value })}
                                    >
                                        <option value="">Select Team</option>
                                        {team.map((t) => (
                                            <option key={t._id} value={t._id}>
                                                {t.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* OWNER */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Owner</label>
                                    <select
                                        className="form-select"
                                        value={taskForm.ownerId}
                                        onChange={(e) =>
                                            setTaskForm({ ...taskForm, ownerId: e.target.value })}
                                    >
                                        <option value="">Select Owner</option>
                                        {user.map((u) => (
                                            <option key={u._id} value={u._id}>
                                                {u.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* TAGS */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Tags</label>
                                    <select
                                        className="form-select"
                                        value={taskForm.tagId}
                                        onChange={(e) =>
                                            setTaskForm({ ...taskForm, tagId: e.target.value })}
                                    >
                                        <option value="">Select Tag</option>
                                        {tags.map((tag) => (
                                            <option key={tag._id} value={tag._id}>
                                                {tag.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* STATUS */}
                                <div className="col-md-6">
                                    <label className="fw-semibold">Status</label>
                                    <select
                                        className="form-select"
                                        value={taskForm.status}
                                        onChange={(e) =>
                                            setTaskForm({ ...taskForm, status: e.target.value })}
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
                                        value={taskForm.timeToComplete}
                                        onChange={(e) =>
                                            setTaskForm({
                                                ...taskForm,
                                                timeToComplete: e.target.value,
                                            })}
                                    />
                                </div>

                            </form>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={handleCreateTask}
                                data-bs-dismiss="modal"
                            >
                                {editTaskId ? "Update Task" : "Create Task"}
                            </button>

                        </div>

                    </div>
                </div>
            </div>


        </div>
    );
}

export default SettingPage;
