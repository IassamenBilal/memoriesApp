import React, { useState, useEffect } from "react";
import makeStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { Alert } from "@material-ui/lab";

export default function Form({ currentID, setcurrentID }) {
  const [postData, setpostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [error, setError] = useState(false);
  const classes = makeStyles();
  const post = useSelector((state) =>
    currentID ? state.posts.find((p) => p._id === currentID) : null
  );

  useEffect(() => {
    if (post) setpostData(post);
  }, [post]);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentID) {
      dispatch(updatePost(currentID, postData));
    } else {
      if (
        postData.creator == "" ||
        postData.title == "" ||
        postData.message == ""
      ) {
        setError(true);
      } else {
        dispatch(createPost(postData));
        clear();
      }
    }
  };
  const clear = () => {
    setcurrentID(null);
    setpostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      {error && (
        <Alert variant="filled" severity="error">
          Please fill in the form
        </Alert>
      )}

      <form
        className={`${classes.root} ${classes.form}`}
        action=""
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Typography variant="h6">
          {!currentID ? "Creating " : "Editing "}Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          required
          value={postData.creator}
          onChange={(e) => {
            setpostData({ ...postData, creator: e.target.value });
            setError(false);
          }}
        ></TextField>
        <TextField
          name="title"
          variant="outlined"
          required
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setpostData({ ...postData, title: e.target.value })}
        ></TextField>
        <TextField
          name="message"
          required
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setpostData({ ...postData, message: e.target.value })
          }
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          required
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setpostData({ ...postData, tags: e.target.value.split(",") })
          }
        ></TextField>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setpostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          type="submit"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
