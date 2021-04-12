import { Badge, createStyles, makeStyles, Theme, Typography, withStyles } from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import React, { useEffect } from "react";
import { grey, orange } from "@material-ui/core/colors";
import { useProductCartStore } from "../../api/Store/RootStore";
import { observer } from "mobx-react-lite" // Or "mobx-react".

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      color: grey[600],
      cursor: "pointer",
      '&:hover': {
        color: orange[400]
      },
    },
    badge: {
      marginRight: 20,
    }
  }),
);

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 4,
      padding: '0 4px',
    },
  }),
)(Badge);

const StyledTypography = withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: -5,
    }
  }),
)(Typography);

export const CartIcon = observer(() => {
  const productCartStore = useProductCartStore();
  const classes = useStyles();

  useEffect(() => {
    productCartStore.updateCartData();
  }, []);

  return (
    <StyledBadge badgeContent={productCartStore.cartCount} color="secondary" className={classes.badge} >
      <div className={classes.root} >
        <AddShoppingCartIcon />
        <StyledTypography>
          cart
        </StyledTypography>
      </div>
    </StyledBadge>
  )
});