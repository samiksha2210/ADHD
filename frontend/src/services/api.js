import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const fetchSubjects = () => API.get('/subjects').then(res => res.data);
export const fetchChannelData = (subject, channel_index) => API.post('/channel-data', { subject, channel_index }).then(res => res.data);
export const fetchStats = (subject, channel_index) => API.post('/stats', { subject, channel_index }).then(res => res.data);
export const fetchFFTData = (subject, channel_index) => API.post('/frequency-data', { subject, channel_index }).then(res => res.data);
export const fetchOutliers = (subject, channel_index, threshold = 3.0) =>
  API.post('/outliers', { subject, channel_index, threshold }).then(res => res.data); 