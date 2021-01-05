import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost, config) => axios.post(url, newPost, config);
export const updatePost = (id, updatedPost, config) =>
  axios.patch(`${url}/${id}`, updatedPost, config);
export const deletePost = (id, config) => axios.delete(`${url}/${id}`, config);
export const likePost = (id, config) =>
  axios.patch(`${url}/${id}/likePost`, config);
