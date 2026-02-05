import api from '../lib/api';

export const getSubmissions = async () => {
    const response = await api.get('/submissions');
    return response.data;
};

export const getSubmissionById = async (id) => {
    try {
        const response = await api.get(`/submissions/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching submission:", error);
        throw error;
    }
};

export const createSubmission = async (submissionData) => {
    const config = {
        headers: {}
    };

    if (submissionData instanceof FormData) {
        // Let the browser set the Content-Type with the boundary
        // We set it to undefined to override the default 'application/json'
        config.headers['Content-Type'] = undefined;
    }

    try {
        const response = await api.post('/submissions', submissionData, config);
        return response.data;
    } catch (error) {
        throw error; // Axios throws error with response property
    }
};

export const approveSubmission = async (id) => {
    const response = await api.post(`/submissions/${id}/approve`);
    return response.data;
};

export const rejectSubmission = async (id) => {
    const response = await api.post(`/submissions/${id}/reject`);
    return response.data;
};
