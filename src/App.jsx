import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import ResponsiveSidebar from "./components/ResponsiveSidebar";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TaskPage from './pages/TaskPage';
import TeamPage from './pages/TeamPage';
import ReportPage from './pages/ReportPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProjectsPage from './pages/ProjectsPage';
import TeamDetails from './pages/TeamDetails';
import SettingPage from './pages/SettingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<SignupPage />} />

        {/* Protected UI */}
        <Route
          path="/*"
          element={
            <div className="d-flex">
              <ResponsiveSidebar />
              <div className="flex-grow-1">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/tasks" element={<TaskPage />} />
                  <Route path="/teams" element={<TeamPage />} />
                  <Route path='/teams/:teamId' element={<TeamDetails/>}/>
                  <Route path="/reports" element={<ReportPage />} />
                  <Route path='/settings' element={<SettingPage/>}/>
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
