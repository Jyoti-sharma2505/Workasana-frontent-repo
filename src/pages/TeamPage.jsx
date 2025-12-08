import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeamPage = () => {
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [teamDesc, setTeamDesc] = useState("");
    const [members, setMembers] = useState([""]); // dynamic member inputs

    const navigate = useNavigate();

    const fetchTeams = async () => {
        try {
            const res = await axios.get("https://workasana-backend-repo.vercel.app/teams");
            setTeams(res.data);
        } catch (error) {
            console.log("Error fetching teams:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("https://workasana-backend-repo.vercel.app/users");
            setUsers(response.data.data || []);
            console.log(response.data.data,"uers")
        } catch (err) {
            console.log("Error fetching users:", err)
        }
    }

    useEffect(() => {
        fetchTeams();
        fetchUsers();
    }, []);

    // Add new member input field
    const addMemberField = () => {
        setMembers([...members, ""]);
    };

    // Update member field value
    const handleMemberChange = (index, value) => {
        const updated = [...members];
        updated[index] = value;
        setMembers(updated);
    };

    // Create New Team
    const createTeam = async () => {
        try {
            const body = {
                name: teamName,
                description: teamDesc,
                members: members.filter((m) => m.trim() !== ""),
            };

            await axios.post("https://workasana-backend-repo.vercel.app/teams", body);


            // Reset fields
            setTeamName("");
            setTeamDesc("");
            setMembers([""]);

            // Refresh team list
            fetchTeams();

            ///Toster
            toast.success("Team added successfully...")

            // Close modal
            document.getElementById("closeModalBtn").click();

        } catch (error) {
            console.log("Error creating team:", error);
        }
    };

    return (
        <div className="container mt-4">
             <ToastContainer position="top-right" autoClose={2000} />

            {/* Page Heading */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Teams Management</h2>

                <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#teamModal"
                >
                    + Add New Team
                </button>
            </div>

            {/* Teams List */}
            <div className="row">
                {teams?.map((team) => (
                    <div key={team._id} className="col-md-4 mb-4">
                        <div className="card team-card shadow-sm p-3">

                            <h4 className="fw-bold mb-3">{team.name}</h4>

                            {/* Member Profiles */}
                            <div className="d-flex align-items-center">
                                {team?.members.slice(0, 3).map((mem, index) => (
                                    <div key={index} className="me-2">
                                        <div
                                            className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                                            style={{ width: 40, height: 40 }}
                                        >
                                            {mem?.name.charAt(0)}
                                        </div>
                                    </div>
                                ))}

                                {team?.members.length > 3 && (
                                    <span className="badge bg-secondary ms-2">
                                        +{team.members.length - 3} more
                                    </span>
                                )}
                            </div>

                            {/* Button */}
                            <button
                                className="btn btn-outline-primary w-100 mt-3"
                                onClick={() => navigate(`/teams/${team._id}`)}
                            >
                                View Team Details
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            {/* ADD TEAM MODAL */}
            <div className="modal fade" id="teamModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Create New Team</h5>
                            <button id="closeModalBtn" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">

                            {/* Team Name */}
                            <label className="fw-semibold mb-1">Team Name</label>
                            <input
                                className="form-control mb-3"
                                placeholder="Enter team name"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                            />

                            {/* Description */}
                            <label className="fw-semibold mb-1">Team Description</label>
                            <textarea
                                className="form-control mb-3"
                                placeholder="Enter description"
                                value={teamDesc}
                                onChange={(e) => setTeamDesc(e.target.value)}
                            ></textarea>

                            {/* Members */}
                            <label className="fw-semibold mb-2">Add Members</label>

                            {members?.map((mem, index) => (
                                <select
                                    key={index}
                                    className="form-control mb-2"
                                    value={mem}
                                    onChange={(e) => handleMemberChange(index, e.target.value)}
                                >
                                    <option value="">Select User</option>

                                    {users?.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            ))}


                            <button className="btn btn-sm btn-secondary" onClick={addMemberField}>
                                + Add More Member
                            </button>

                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" onClick={createTeam}>
                                Create Team
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default TeamPage;
