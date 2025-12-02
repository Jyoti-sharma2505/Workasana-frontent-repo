import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

// ---------------------------------------------------------------
// CLEAN & FINAL REPORT PAGE COMPONENT
// ---------------------------------------------------------------

export default function ReportPage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const [workLastWeek, setWorkLastWeek] = useState([]);
  const [pendingByDay, setPendingByDay] = useState([]);
  const [tasksByTeam, setTasksByTeam] = useState([]);
  const [tasksByOwner, setTasksByOwner] = useState([]);

  // ------------ SAMPLE DATA (you can replace with API later) ------------------

  const sampleWorkLastWeek = [
    { day: "Mon", completed: 6 },
    { day: "Tue", completed: 9 },
    { day: "Wed", completed: 7 },
    { day: "Thu", completed: 11 },
    { day: "Fri", completed: 8 },
    { day: "Sat", completed: 4 },
    { day: "Sun", completed: 2 },
  ];

  const samplePendingByDay = [
    { name: "0-2 days", value: 24 },
    { name: "3-5 days", value: 12 },
    { name: "6+ days", value: 6 },
  ];

  const sampleTasksByTeam = [
    { team: "Design", closed: 32 },
    { team: "Backend", closed: 45 },
    { team: "Frontend", closed: 38 },
    { team: "QA", closed: 19 },
  ];

  const sampleTasksByOwner = [
    { owner: "Alice", closed: 18 },
    { owner: "Bob", closed: 26 },
    { owner: "Charlie", closed: 22 },
    { owner: "Devika", closed: 14 },
  ];

  // Colors for pie chart
  const PIE_COLORS = ["#4e73df", "#1cc88a", "#36b9cc"];

  // -------------------------- Load Data --------------------------
  useEffect(() => {
    // For now use sample datasets so UI loads instantly
    setTimeout(() => {
      setWorkLastWeek(sampleWorkLastWeek);
      setPendingByDay(samplePendingByDay);
      setTasksByTeam(sampleTasksByTeam);
      setTasksByOwner(sampleTasksByOwner);
      setSummary({ totalLastWeek: 47, totalPending: 42 });
      setLoading(false);
    }, 300);
  }, []);

  // -------------------------- UI --------------------------

  return (
    <div className="container-fluid p-4">
      {/* HEADER */}
      <div className="row mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h3 className="m-0">Workasana Reports</h3>
          <div>
            <button className="btn btn-outline-secondary btn-sm me-2">
              Back to Dashboard
            </button>
            <button className="btn btn-primary btn-sm">Refresh</button>
          </div>
        </div>
      </div>

      <div className="row">

        {/* MAIN CONTENT */}
        <main className="col-md-10">
          <div className="row g-3">

            {/* Chart 1 */}
            <div className="col-md-4">
              <div className="card p-3 h-100">
                <h6>Total Work Done Last Week</h6>
                <div style={{ width: "100%", height: 160 }}>
                  <ResponsiveContainer>
                    <LineChart data={workLastWeek}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="completed" stroke="#4e73df" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-muted">Total: {summary.totalLastWeek}</div>
              </div>
            </div>

            {/* Chart 2 */}
            <div className="col-md-4">
              <div className="card p-3 h-100">
                <h6>Total Days of Work Pending</h6>
                <div style={{ width: "100%", height: 160 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={pendingByDay} dataKey="value" nameKey="name" innerRadius={35} outerRadius={55}>
                        {pendingByDay.map((entry, index) => (
                          <Cell key={index} fill={PIE_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-muted">Total pending: {summary.totalPending}</div>
              </div>
            </div>

            {/* Chart 3 */}
            <div className="col-md-4">
              <div className="card p-3 h-100">
                <h6>Tasks Closed by Team</h6>
                <div style={{ width: "100%", height: 160 }}>
                  <ResponsiveContainer>
                    <BarChart data={tasksByTeam} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="team" type="category" />
                      <Tooltip />
                      <Bar dataKey="closed" fill="#1cc88a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Chart 4 */}
            <div className="col-md-6">
              <div className="card p-3 h-100">
                <h6>Tasks Closed by Owner</h6>
                <div style={{ width: "100%", height: 240 }}>
                  <ResponsiveContainer>
                    <BarChart data={tasksByOwner}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="owner" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="closed" fill="#36b9cc" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="col-md-6">
              <div className="card p-3 h-100">
                <h6>Additional Insights</h6>
                <ul className="text-muted small">
                  <li>Avg tasks/day: {Math.round((summary.totalLastWeek || 0) / 7)}</li>
                  <li>Pending buckets: {pendingByDay.length}</li>
                  <li>Teams tracked: {tasksByTeam.length}</li>
                </ul>

                <button className="btn btn-outline-primary btn-sm me-2">Export CSV</button>
                <button className="btn btn-outline-secondary btn-sm">View Raw Data</button>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* LOADING SPINNER */}
      {loading && (
        <div className="position-fixed top-50 start-50 translate-middle">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
