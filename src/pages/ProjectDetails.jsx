import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Clean Single API Fetch
  const fetchProject = async () => {
    try {
      const res = await axios.get(
        `https://workasana-backend-repo.vercel.app/projects/${id}`
      );

      setProject(res.data); // Backend returns project inside "data"
    } catch (error) {
      toast.error("Unable to fetch project");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(project,"abc")

  useEffect(() => {
    fetchProject();
  }, [id]);

  // 🗑 Delete project
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(
        `https://workasana-backend-repo.vercel.app/project/${id}`
      );

      toast.success("Project deleted");
      navigate(-1);
    } catch (err) {
      toast.error("Failed to delete project");
    }
  };

  const statusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-success";
      case "In Progress":
        return "bg-info";
      case "To Do":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;
  if (!project) return <h3 className="text-center mt-5 text-danger">Project not found.</h3>;

  return (
    <div className="container mt-4">
      <ToastContainer autoClose={2000} />

      <div className="d-flex justify-content-between align-items-start mb-3">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div>
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={() => navigate(`/projects/edit/${id}`)}
          >
            Edit
          </button>
          <button className="btn btn-sm btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h2 className="fw-bold mb-1">{project.data.name}</h2>
              <div className="text-muted small">
                Created: {new Date(project.data.createdAt).toLocaleString()}
              </div>
            </div>

            <span className={`badge ${statusBadgeClass(project.status)} fs-6`}>
              {project.data.status}
            </span>
          </div>

          <hr />

          <h5 className="fw-semibold">Description</h5>
          <p className="text-secondary">
            {project.data.description || "No description provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
