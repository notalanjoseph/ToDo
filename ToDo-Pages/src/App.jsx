import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
// import Login from './components/Login';
// import SignUp from './components/SignUp';
import Auth from './components/Auth';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
};

export default App;
