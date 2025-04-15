import { useState, useEffect } from 'react';
import { fetchEvents } from '../services/api';
import EventCard from '../components/EventCard';
import { Event } from '../types/Event';
import '../styles/EventList.css';

function EventList() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getEvents = async () => {
            try {
                setLoading(true);
                const data = await fetchEvents();
                setEvents(data);
                setError(null);
            } catch (err) {
                setError('Failed to load events. Please try again later.');
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };

        getEvents();
    }, []);

    if (loading) {
        return <div className="loading">Loading events...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="event-list-container">
            <h2>Upcoming Events</h2>
            {events.length === 0 ? (
                <p className="no-events">No events available. Create your first event!</p>
            ) : (
                <div className="event-grid">
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default EventList;
