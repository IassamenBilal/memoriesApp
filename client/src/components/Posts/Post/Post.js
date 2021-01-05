import React from "react";
import useStyles from "./styles";
import {
  Card,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

export default function Post({ post, setcurrentID }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {isAuth ? (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setcurrentID(post._id);
            }}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      ) : null}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography component="p" color="textSecondary">
          {post.message}
        </Typography>
      </CardContent>
      {isAuth ? (
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="priamry"
            onClick={() => {
              dispatch(likePost(post._id));
            }}
          >
            <ThumbUpAltIcon fontSize="small" />
            {post.likeCount}
          </Button>
          <Button
            size="small"
            color="priamry"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}
