import React, { useState } from "react";
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {

}

const LoginForm = (props: LoginFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userData = { username, password };
            const loggedInUser = await loginUser(userData);
            console.log('Login successful:', loggedInUser);

            navigate('chat', { state: {currentUser: userData.username}});
        } catch (error) {
            console.error('Login failed', error);
        }
    };
    return (
        <div>
            <h2 className="chat-header">Login</h2>
            <input
                className="input-field"
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="send-button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default LoginForm;