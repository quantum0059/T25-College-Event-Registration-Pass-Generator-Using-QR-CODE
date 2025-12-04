import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'attendee' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', form);
            alert('Registration Successful! Please Login.');
            navigate('/login');
        } catch (err) {
            alert('Error Registering');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="card">
                <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} required />
                <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} required />
                <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} required />
                <select onChange={(e) => setForm({...form, role: e.target.value})}>
                    <option value="attendee">Student</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="btn" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
