import axios, { AxiosResponse } from 'axios';
import { Event, CreateEventDto } from '../types/Event';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchEvents = async (): Promise<Event[]> => {
    try {
        const response: AxiosResponse<Event[]> = await api.get('/events');
        return response.data;
    } catch (error) {
        console.error('API Error fetching events:', error);
        throw error;
    }
};

export const createEvent = async (eventData: CreateEventDto): Promise<Event> => {
    try {
        const response: AxiosResponse<Event> = await api.post('/events', eventData);
        return response.data;
    } catch (error) {
        console.error('API Error creating event:', error);
        throw error;
    }
};
