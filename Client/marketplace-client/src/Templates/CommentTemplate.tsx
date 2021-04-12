import React from "react";
import { Box, createStyles, Divider, makeStyles, Theme, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { ICommentProduct } from "../Interface/ICommentProduct";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      marginTop: 25,
      marginBottom: 20
    },

    commentField: { fontWeight: 600, margin: 10 }
}));

export default function CommentTemplate(props: ICommentProduct) {
    const classes = useStyles()
    return (
        <div>
            <Divider />
            <Box className={classes.box}>
                <Rating name="half-rating-read" defaultValue={props.rate} precision={0.5} readOnly size="large" />
                <Typography className={classes.commentField}>Comment</Typography>
                <Typography>{props.comment}</Typography>
            </Box>
        </div>
    )
} 