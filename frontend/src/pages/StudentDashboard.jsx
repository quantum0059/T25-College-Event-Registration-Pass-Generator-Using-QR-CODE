import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import QRCode from 'react-qr-code';

const StudentDashboard = () => {
    const { token, user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [ticket, setTicket] = useState(null); // Just showing last bought ticket for demo

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get('http://localhost:5000/api/events');
            setEvents(res.data);
        };
        fetchEvents();
    }, []);

    const buyTicket = async (eventId) => {
        try {
            const res = await axios.post(
                'http://localhost:5000/api/tickets/purchase',
                { eventId },
                { headers: { Authorization: token } }
            );
            alert(res.data.message);
            setTicket(res.data.ticket); // Show QR immediately
        } catch (err) {
            alert('Error buying ticket');
        }
    };

    return (
        <div className="container">
            <h2>Welcome, {user?.name}</h2>

            {ticket && (
                <div className="card" style={{ textAlign: 'center', border: '2px solid #28a745' }}>
                    <h3>Your Digital Ticket</h3>
                    <QRCode value={ticket.uniqueQrToken} size={150} />
                    <p><strong>ID:</strong> {ticket.uniqueQrToken}</p>
                    <p>Show this at the entrance.</p>
                </div>
            )}

            <h3>Upcoming Events</h3>
            {events.map(event => (
                <div key={event._id} className="card">
                    <h4>{event.name}</h4>
                    <p>{event.date.substring(0, 10)} | {event.location}</p>
                    <p>Price: ${event.price}</p>
                    <button className="btn" onClick={() => buyTicket(event._id)}>Buy Ticket</button>
                </div>
            ))}
        </div>
    );
};

export default StudentDashboard;