import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async () => {
        try {
            await axios.post("https://workasana-backend-repo.vercel.app/auth/signup", form);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: "420px", borderRadius: "15px" }}>
                <h3 className="text-center mb-4 fw-bold">Create Account ✨</h3>

                {error && <p className="text-danger text-center">{error}</p>}

                <div className="mb-3">
                    <label className="fw-semibold">Full Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your name"
                        name="name"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="fw-semibold">Email Address</label>
                    <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter your email"
                        name="email"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="fw-semibold">Password</label>
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Enter your password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>

                <button
                    className="btn btn-success btn-lg w-100 mt-2"
                    onClick={handleSignup}
                    style={{ borderRadius: "10px" }}
                >
                    Signup
                </button>

                <p className="mt-3 text-center">
                    Already have an account?{" "}
                    <span
                        className="text-primary fw-semibold"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
