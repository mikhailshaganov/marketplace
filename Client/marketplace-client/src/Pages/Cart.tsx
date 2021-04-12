import React, { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Button, IconButton, TextField, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove'
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { ICartProducts } from '../Interface/ICartProducts';
import { observer } from "mobx-react-lite" // Or "mobx-react".
import { useProductCartStore } from '../api/Store/RootStore';
import { LoadStatus } from '../Constant/LoadingStatus';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      fontWeight: 600,
      height: 50

    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles((theme) =>
  createStyles({
    table: {
      minWidth: 700,
      maxWidth: 1200,
      alignContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 40
    },

    divider: {
      marginTop: 20,
      marginBottom: 20
    },

    totalPrice: {
      fontWeight: 600,
      marginRight: 30
    },

    completePanel: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 20,
      marginBottom: 20,
      maxWidth: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    quantityField: {
      maxWidth: 20,
      textAlign: 'center'
    },
    circular: {
      margin: theme.spacing(1),
      top: '50%',
      left: '50%',
      position: "fixed"
    },
  }));

export const Cart = observer(() => {
  const classes = useStyles();
  const productCartStore = useProductCartStore();

  const productsData = productCartStore.cartProducts;
  const [loadingStatus, setLoadingStatus] = useState<string>(
    LoadStatus.ERROR
  );

  const handleRemoveItem = (productID: number) => {
    productCartStore.removeCartItem(productID)
  }

  const handleMinusClick = (productID: number) => {
    productCartStore.changeCartProducts(productID, -1);
  }

  const handlePlusClick = (productID: number) => {
    productCartStore.changeCartProducts(productID, 1);
  }

  const changeQuantityProduct = (event: any, productID: number) => {
    if (Number(event.target.value)) {
      productCartStore.changeCartProducts(productID, +event.target.value, true);
    }
  }

  useEffect(() => {
    function getCartData() {
      try {
        productCartStore.updateCartData();
        setLoadingStatus(LoadStatus.LOADED);
      } catch (error) {
        setLoadingStatus(LoadStatus.ERROR);
      }
    }

    setLoadingStatus(LoadStatus.LOADING);
    setTimeout(() => {
      getCartData();
    }, 1000)
  }, []);

  return (
    <div>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell align="right">In Stock</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingStatus === LoadStatus.LOADED ? (
              productsData.map((product: ICartProducts) => (
                <StyledTableRow key={product.productID}>
                  <StyledTableCell component="th" scope="row">
                    {product.productName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{product.inStock}</StyledTableCell>
                  <StyledTableCell align="right">{product.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    <div>
                      <IconButton color="secondary" size="small" onClick={() => handleMinusClick(product.productID)}>
                        <Remove fontSize="small" />
                      </IconButton>
                      <TextField id="standard-basic" inputProps={{ className: classes.quantityField }} value={product.quantity} onChange={(event) => changeQuantityProduct(event, product.productID)} />
                      <IconButton color="secondary" size="small" onClick={() => handlePlusClick(product.productID)}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="right">{product.amount}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton aria-label="Delete" onClick={() => { handleRemoveItem(product.productID) }}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
                <CircularProgress className={classes.circular} />
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box component="div" className={classes.completePanel}>
        <Typography variant="h4" className={classes.totalPrice}>
          Total ${productCartStore.cartSumPrice}
        </Typography>
        <Button variant="contained" style={{ backgroundColor: "#FFC371" }}>
          COMPLETE PURCHASE
            <NavigateNextIcon />
        </Button>
      </Box>

    </div>
  );
});

