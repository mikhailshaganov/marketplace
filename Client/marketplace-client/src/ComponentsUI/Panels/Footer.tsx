import React from "react";
import { Typography, Theme, createStyles, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: "static",
      bottom: 0,
      backgroundColor: "#FFC371",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: "#000000",
      align: "center",
      textAlign: "center",
    },
  }),
);

export default function Footer() {
  const classes = useStyles();

  return (
      <AppBar className={classes.root}>
        <Toolbar>
          <Typography className={classes.title}>
            {"Copyright © "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Toolbar>
      </AppBar>
  );
}
