import * as api from "../api";
import { tokenConfig } from "./user";
//Actions

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    const action = { type: "FETCH_ALL", payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch, getState) => {
  try {
    const config = tokenConfig(getState);
    const { data } = await api.createPost(post, config);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch, getState) => {
  try {
    const config = tokenConfig(getState);
    console.log(config);
    const { data } = await api.updatePost(id, post, config);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    const config = tokenConfig(getState);
    await api.deletePost(id, config);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch, getState) => {
  try {
    const config = tokenConfig(getState);
    console.log(config);
    const { data } = await api.likePost(id, config);
    dispatch({ type: "LIKE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
