import React, { useEffect, useState } from "react";
import { Container, Typography, Grow, Grid, AppBar } from "@material-ui/core";
import memories from "./images/memories.png";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import makeStyles from "./styles";
import { getPosts } from "./actions/posts";
import LoginAppBar from "./components/Auth/LoginAppBar";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./actions/user";

export default function App() {
  const [currentID, setcurrentID] = useState(null);
  const classes = makeStyles();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <Container maxWidth="lg">
        <div>
          <AppBar className={classes.appBar} position="static" color="inherit">
            <span>
              <Typography className={classes.heading} variant="h2">
                Memories
              </Typography>
              <img src={memories} alt="mem" height="60" />
            </span>
            <LoginAppBar />
          </AppBar>
        </div>
        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch">
              <Grid item xs={12} sm={7}>
                <Posts setcurrentID={setcurrentID} />
              </Grid>
              <Grid item xs={12} sm={4}>
                {isAuth ? (
                  <Form currentID={currentID} setcurrentID={setcurrentID} />
                ) : (
                  "Login to Add memories"
                )}
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  );
}
