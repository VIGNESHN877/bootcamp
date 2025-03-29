import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async (status, sort) => {
  const params = {};
  if (status) params.status = status;
  if (sort) params.sort = sort;
  return axios.get(API_URL, { params });
};

export const getTask = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createTask = async (taskData) => {
  return axios.post(API_URL, taskData);
};

export const updateTask = async (id, taskData) => {
  return axios.patch(`${API_URL}/${id}`, taskData);
};

export const deleteTask = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

