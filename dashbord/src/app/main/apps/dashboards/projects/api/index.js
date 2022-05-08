import axios from 'axios';
const form = require('../../projects/components/Phase/Form/Form')

const pid =form.projectidd

const emailvalue= localStorage.getItem('emailvalue');
const url1 = 'http://localhost:5000/projects';
const url2 = 'http://localhost:5000/phases';
const url3 = 'http://localhost:5000/api/team';
export const fetchPosts = () => axios.get(`http://localhost:5000/projects/api/projects?user=${emailvalue}`);
export const createPost = (newPost) => axios.post(url1, newPost);
export const likePost = (id) => axios.patch(`${url1}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url1}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url1}/${id}`);

export const fetchPhases = () => axios.get(`${url2}/${pid}`);
export const createPhase = (newPhase) => axios.post(url2, newPhase);
export const likePhase = (id) => axios.patch(`${url2}/${id}/likePhase`);
export const updatePhase = (id, updatedPhase) => axios.patch(`${url2}/${id}`, updatedPhase);
export const deletePhase = (id) => axios.delete(`${url2}/${id}`);

export const fetchTeams = () => axios.get(`${url3}/find`);