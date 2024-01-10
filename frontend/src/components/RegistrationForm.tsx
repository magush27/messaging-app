import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom'


interface RegistrationFormProps {

}

const RegistrationForm = (props: RegistrationFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleRegistration = async () => {
        try {
            const userData = { username, password };
            const registeredUser = await registerUser(userData);
            console.log('Registration successful:', registeredUser);

            navigate('/');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="chat-container">
            <h2 className="chat-header">Sign up</h2>
            <div>
                    <input
                        className="input-field"
                        type="text"
                        value={username}
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
            </div>
            <div>
                    <input
                        className="input-field"
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
            </div>
            <div>
                <button className="send-button" onClick={handleRegistration}>
                    Sign up
                </button>
            </div>
        </div>
    );
};

export default RegistrationForm;