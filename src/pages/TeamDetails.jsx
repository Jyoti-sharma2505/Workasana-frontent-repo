import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TeamDetails = () => {
    const { teamId } = useParams();
    const navigate = useNavigate();

    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    // Fetch team details
    const fetchTeamDetail = async () => {
        try {
            const res = await axios.get(
                `https://workasana-backend-repo.vercel.app/team/${teamId}`
            );
            setTeam(res.data.data);
            setLoading(false);
        } catch (err) {
            console.log("Error fetching team:", err);
            setLoading(false);
        }
    };

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const res = await axios.get("https://workasana-backend-repo.vercel.app/users");
            console.log(res)
            setUsers(res.data.data || []);
        } catch (err) {
            console.log("Error fetching users:", err);
        }
    };
    console.log(users)

    // Add member to team
    const addMemberToTeam = async () => {
        if (!selectedUser) return alert("Please select a user!");

        try {
            await axios.post(
                `https://workasana-backend-repo.vercel.app/team/add-member/${teamId}`,
                { memberId: selectedUser }
            );

            // Refresh team data
            fetchTeamDetail();
            setSelectedUser("");

            // Close modal
            document.querySelector("#addMemberModal .btn-close").click();

        } catch (err) {
            console.log("Error adding member:", err);
        }
    };

    useEffect(() => {
        fetchTeamDetail();
        fetchUsers();
    }, [teamId]);

    if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

    return (
        <div className="container mt-4">

            <button className="btn btn-outline-primary mb-3" onClick={() => navigate(-1)}>
                ← Back to Teams
            </button>

            <div className="card shadow-lg p-4 border-0">

                {/* Team Name */}
                <h2 className="fw-bold text-primary">{team.name}</h2>
                <p className="text-secondary">{team.description}</p>

                <hr />

                {/* Members Section */}
                <h4 className="fw-bold mb-3">Team Members</h4>

                {team.members?.length === 0 && (
                    <p className="text-danger">No members added</p>
                )}

                <ul className="list-group list-group-flush mb-4">
                    {team.members?.map((m) => (
                        <li
                            key={m._id}
                            className="list-group-item d-flex align-items-center py-3"
                        >
                            <div
                                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                                style={{ width: 35, height: 35, fontSize: 16 }}
                            >
                                {m.name.charAt(0)}
                            </div>

                            <span className="fw-semibold fs-5">{m.name}</span>
                        </li>
                    ))}
                </ul>

                {/* Add Member Button */}
                <button
                    className="btn btn-primary mt-3"
                    style={{width:"30%"}}
                    data-bs-toggle="modal"
                    data-bs-target="#addMemberModal"
                >
                    + Add Member
                </button>

            </div>

            {/* Add Member Modal */}
            <div className="modal fade" id="addMemberModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Add Member to Team</h5>
                            <button id="closeMemberModal" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <label className="fw-semibold mb-2">Select User</label>

                            <select
                                className="form-control"
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                            >
                                <option value="">Choose user</option>

                                {users.map((u) => (
                                    <option key={u._id} value={u._id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" onClick={addMemberToTeam}>
                                Add Member
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default TeamDetails;
