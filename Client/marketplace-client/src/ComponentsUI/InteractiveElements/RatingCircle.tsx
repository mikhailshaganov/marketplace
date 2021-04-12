import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { IReviewPoint } from '../../Interface/IReviewPoint';

const StyledCircle = withStyles({
  root: {
    color: orange[400],
  },
  circle: {
    strokeLinecap: 'round',
  },
})(CircularProgress);

const CircleContent = withStyles({
  root: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  }
})(Box)

export default function RatingCircle(props: IReviewPoint) {
  
  function getCurrentRate(): number {
    return props.middleRate === 0 ? 100 : props.middleRate*20;
  }

  return (
    <Box position="relative" display="inline-flex">
    <StyledCircle thickness={2.3} size={200} variant="determinate" value={getCurrentRate()} />
    <CircleContent>
      <Typography style={{fontWeight: 500}} variant="h3" component="div" >
        {props.middleRate}
     </Typography>
     <Typography>
       Common rating
     </Typography>
     <Typography>
       {props.reviewsCount} voices
     </Typography>
     </CircleContent>
  </Box>
  );
}