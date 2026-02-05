import api from '../lib/api';

export const getEvents = async (params) => {
    const response = await api.get('/events', { params });
    return response.data;
};

export const getEvent = async (slug) => {
    const response = await api.get(`/events/${slug}`);
    return response.data;
};

export const createEvent = async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
};

export const deleteEvent = async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
};

export const updateEvent = async (id, data) => {
    const response = await api.patch(`/events/${id}`, data);
    return response.data;
};
