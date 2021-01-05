import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import makeStyles from "./styles";

export default function Posts({ setcurrentID }) {
  const posts = useSelector((state) => state.posts);
  const classes = makeStyles();
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      container
      alignItems="stretch"
      spacing={3}
      className={classes.mainContainer}
    >
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={6}>
          <Post post={post} setcurrentID={setcurrentID} />
        </Grid>
      ))}
    </Grid>
  );
}
