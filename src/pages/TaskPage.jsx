import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("https://workasana-backend-repo.vercel.app/tasks");
            setTasks(response.data);
        } catch (error) {
            console.log("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container-fluid mt-4">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold m-0">Project: Website Redesign</h3>

                <Link to="/" className="btn btn-outline-secondary">
                    ← Back to Dashboard
                </Link>
            </div>

            {/* ======================
              TOP MENU + FILTER BAR  
            ======================= */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body d-flex flex-wrap align-items-center gap-3">

                    {/* MENU BUTTONS */}
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary active">Tasks</button>
                        <button className="btn btn-outline-primary">Overview</button>
                        <button className="btn btn-outline-primary">Members</button>
                        <button className="btn btn-outline-primary">Files</button>
                    </div>

                    <div className="vr"></div>

                    {/* FILTERS */}
                    <select className="form-select w-auto">
                        <option>Owner: All</option>
                        <option>Rahul</option>
                        <option>Jyoti</option>
                        <option>Pooja</option>
                    </select>

                    <select className="form-select w-auto">
                        <option>Tag: All</option>
                        <option>Urgent</option>
                        <option>Design</option>
                        <option>Client</option>
                    </select>

                    <select className="form-select w-auto">
                        <option>Sort: Due Date</option>
                        <option>Priority</option>
                        <option>Status</option>
                    </select>

                    {/* PUSH BUTTON TO RIGHT */}
                    <div className="ms-auto"></div>

                    {/* ADD TASK */}
                    <button className="btn btn-primary px-4">
                        + Add Task
                    </button>
                </div>
            </div>

            {/* ======================
                  TASK TABLE  
            ======================= */}
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
                            {tasks.map((task) => (
                                <tr key={task._id} className="table-row-hover">

                                    {/* Task Name */}
                                    <td className="fw-semibold">{task.name}</td>

                                    {/* Status */}
                                    <td>
                                        <span
                                            className={`badge px-3 py-2 
                                            ${task.status === "Completed" ? "bg-success" :
                                                task.status === "In Progress" ? "bg-info" :
                                                    task.status === "To Do" ? "bg-secondary" :
                                                        "bg-warning text-dark"}`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>

                                    {/* Owner */}
                                    <td>
                                        {task?.owners?.[0]?.name || "No Owner"}
                                    </td>

                                    {/* Created Date */}
                                    <td>{new Date(task.createdAt).toLocaleDateString()}</td>

                                    {/* Arrow */}
                                    <td className="text-primary" style={{ cursor: "pointer" }}>
                                        <FaArrowRight size={18} />
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            </div>

        </div>
    );
};

export default TaskPage;
