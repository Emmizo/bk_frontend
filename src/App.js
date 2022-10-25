import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
// import SignUp from "./pages/signUp";
import Home from "./pages/home";
import NoPage from "./pages/noPages";
import Application from "./pages/application";
import JobsApplied from "./pages/job_applied";
import Profile from "./pages/profile";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/jobApplied' element={<JobsApplied />} />
      <Route path='/applied' element={<Application />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='*' element={<NoPage />} />
    </Routes>
  );
}

export default App;
