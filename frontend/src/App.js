import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import ChatWindow from "./components/ChatWindow";
import './style.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={
        <div className="chat-container">
          <LoginForm />
          <Link to="/registration" className="sign-up-link">
            Sign up
          </Link>
        </div>
      } />
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/chat" element={<ChatWindow />} />
    </Routes>
  </Router>
)

export default App;
