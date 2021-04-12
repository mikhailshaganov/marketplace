import { Box, createStyles, makeStyles, Theme, Typography, withStyles } from "@material-ui/core";
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import React from "react";
import { grey, orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      color: grey[600],
      '&:hover': {
        color: orange[400]
      },
      cursor: "pointer",
    },
    badge: {
      marginRight: 20,
    }
  }),
);

const StyledTypography = withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: -5,
    }
  }),
)(Typography);

export default function CompareIcon() {
  const classes = useStyles();
  return (
      <Box className={classes.root} >
        <CompareArrowsIcon/>
        <StyledTypography>
          compare
        </StyledTypography>
      </Box>
  )
}