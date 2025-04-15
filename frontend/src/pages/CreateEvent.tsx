import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/api';
import { CreateEventDto } from '../types/Event';
import '../styles/CreateEvent.css';

interface FormErrors {
    [key: string]: string | null;
}

function CreateEvent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateEventDto>({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        timezone: 'UTC'
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const timezones: string[] = [
        'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
        'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Australia/Sydney'
    ];

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length > 32) {
            newErrors.name = 'Name cannot exceed 32 characters';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (!formData.endDate) {
            newErrors.endDate = 'End date is required';
        } else if (formData.startDate && formData.endDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
            newErrors.endDate = 'End date must be after start date';
        }

        if (!formData.timezone) {
            newErrors.timezone = 'Timezone is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);
        setSubmitError(null);

        try {
            // Format dates to ISO string for API
            const apiData: CreateEventDto = {
                ...formData,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: new Date(formData.endDate).toISOString()
            };

            await createEvent(apiData);
            navigate('/'); // Redirect to events list on success
        } catch (err: any) {
            console.error('Error creating event:', err);

            if (err.response?.data?.message) {
                // Handle validation errors from API
                if (Array.isArray(err.response.data.message)) {
                    const apiErrors: FormErrors = {};
                    err.response.data.message.forEach((error: any) => {
                        const field = error.property;
                        apiErrors[field] = error.constraints[Object.keys(error.constraints)[0]];
                    });
                    setErrors(apiErrors);
                } else {
                    setSubmitError(err.response.data.message);
                }
            } else {
                setSubmitError('Failed to create event. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="create-event-container">
            <h2>Create New Event</h2>

            {submitError && (
                <div className="error-message">{submitError}</div>
            )}

            <form onSubmit={handleSubmit} className="event-form">
                <div className="form-group">
                    <label htmlFor="name">
                        Event Name <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={32}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <div className="error-text">{errors.name}</div>}
                    <div className="char-count">{formData.name.length}/32</div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="startDate">
                            Start Date/Time <span className="required">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className={errors.startDate ? 'error' : ''}
                        />
                        {errors.startDate && <div className="error-text">{errors.startDate}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="endDate">
                            End Date/Time <span className="required">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className={errors.endDate ? 'error' : ''}
                        />
                        {errors.endDate && <div className="error-text">{errors.endDate}</div>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="timezone">
                        Timezone <span className="required">*</span>
                    </label>
                    <select
                        id="timezone"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        className={errors.timezone ? 'error' : ''}
                    >
                        {timezones.map(tz => (
                            <option key={tz} value={tz}>{tz}</option>
                        ))}
                    </select>
                    {errors.timezone && <div className="error-text">{errors.timezone}</div>}
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="btn-secondary"
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={submitting}
                    >
                        {submitting ? 'Creating...' : 'Create Event'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateEvent;
