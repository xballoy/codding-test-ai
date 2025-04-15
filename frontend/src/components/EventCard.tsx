import { FC } from 'react';
import { formatDate } from '../utils/dateUtils';
import { Event } from '../types/Event';
import '../styles/EventCard.css';

interface EventCardProps {
    event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
    const { name, description, startDate, endDate, timezone } = event;

    return (
        <div className="event-card">
            <h3 className="event-name">{name}</h3>

            <div className="event-date">
                <span className="date-label">Starts:</span>
                {formatDate(startDate, timezone)}
            </div>

            <div className="event-date">
                <span className="date-label">Ends:</span>
                {formatDate(endDate, timezone)}
            </div>

            {description && (
                <p className="event-description">
                    {description.length > 100
                        ? `${description.substring(0, 100)}...`
                        : description}
                </p>
            )}
        </div>
    );
}

export default EventCard;
