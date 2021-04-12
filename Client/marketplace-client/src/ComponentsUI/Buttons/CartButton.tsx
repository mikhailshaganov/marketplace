import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { IStuff } from '../../Interface/IStuff';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { observer } from "mobx-react-lite" // Or "mobx-react".
import { useProductCartStore } from '../../api/Store/RootStore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cartIcon: {
          marginRight: 5 
        },
        addState: {
          background: "#FF5F6D"
        },
        cheackoutState: {
          background: "#FFC371"
        }
    }),
);

const CartButtonStyles = withStyles((theme: Theme) => ({
  root: ({
    minWidth: 200,
    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    margin: theme.spacing(1),
  }),
  label: {
    color: theme.palette.common.white,
    textTransform: 'none',
    fontSize: 15,
    fontWeight: 700,
  },
}))(Button);

export const CartButton = observer((props: IStuff) => {
  const productCartStore = useProductCartStore();
  const isInCart = productCartStore.isInCart(props.id);
  const classes = useStyles();

  const addToShoppingCart = () => {
    productCartStore.addProduct(
      {
          productID: props.id,
          productName: props.productName,
          inStock: props.quantity,
          price: props.price,
          quantity: 1,
          amount: props.price
      });
  }

  return (
    isInCart ?
      (<Link to='/cart' style={{ textDecoration: 'none' }}>
        <CartButtonStyles variant="outlined" className={classes.cheackoutState} >
          <AddShoppingCartIcon className={classes.cartIcon} />
            Сheckout
        </CartButtonStyles>
      </Link>
      ) : (
        <CartButtonStyles variant="outlined" onClick={addToShoppingCart} className={classes.addState}>
          <AddShoppingCartIcon className={classes.cartIcon} />
            Add to cart
        </CartButtonStyles>)
  )
});
