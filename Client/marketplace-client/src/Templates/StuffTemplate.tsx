import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { IStuff } from '../Interface/IStuff';
import { Box, Grid } from '@material-ui/core';
import { CartButton } from '../ComponentsUI/Buttons/CartButton'
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import RateReviewIcon from '@material-ui/icons/RateReview';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      marginBottom: 50
    },
    media: {
      height: 340,
      maxHeight: 340,
      maxWidth: 345,
      backgroundSize: "contain"
    },
    price: {
      fontWeight: 700,
    },
    productName: {
      fontSize: 23,
      fontWeight: 200,
      minHeight: 68,
      maxHeight: 68
    },
    ratePanel: {
      display: "flex"
    }
  }));

export default function StuffTemplate(props: IStuff) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Grid item xs={12} >
        <CardActionArea>
          <Link style={{ textDecoration: 'none', color: "inherit" }} to={`/products/` + props.id}>
            <CardMedia
              className={classes.media}
              image={props?.image || "/images/base.png"}
            />
            <CardContent>

            <Box className={classes.ratePanel}>
                <Rating name="half-rating-read" value={props?.rate} precision={0.5} readOnly />
                <Typography>
                  {props.rate}
                </Typography>

                <Box ml={2} className={classes.ratePanel}>
                  <RateReviewIcon />
                  <Typography>
                    {props?.vote || 0}
                  </Typography>
                </Box>

              </Box>

              <Typography gutterBottom component="h2" className={classes.productName} >
                {props?.productName || 0}
              </Typography>
              <Typography variant="h6" className={classes.price}>
                Price: ${props?.price || 0}
              </Typography>
            </CardContent>

          </Link>

        </CardActionArea>

        <CardActions>
          <CartButton {...props} />
        </CardActions>
      </Grid>
    </Card>
  );
};
