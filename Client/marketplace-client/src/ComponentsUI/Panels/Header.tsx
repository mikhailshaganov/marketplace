import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PlaceIcon from '../Icons/PlaceIcon';
import CallIcon from '../Icons/CallIcon';
import { Box } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      minHeight: 33,
      maxHeight: 33,
      maxWidth: 1500,
      margin: "auto"
    },
    headerList: {
      display: "flex", 
      minWidth: 300, 
      justifyContent: "space-around", 
      color: "#000000"
    },
    element: {
      cursor: "pointer",
      '&:hover': {
        color: grey[600]
      },
    }
  }),
);

const StyledAppBar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#FFC371",
      flexGrow: 1,
      width: "100%",
      zIndex: 50,
      position: "fixed",
    }
  }),
)(Box);


export default function MenuAppBar() {
  const classes = useStyles();

  return (
      <StyledAppBar>
        <Toolbar className={classes.root}>
            <PlaceIcon/>
            <Box className={classes.headerList}>
             <Typography className={classes.element}>
               Stock
             </Typography >
             <Typography className={classes.element}> 
             Delivery
             </Typography>
             <Typography className={classes.element}>
               Shops
             </Typography>
             <Typography className={classes.element}>
             Callback
             </Typography>
           </Box>
           <CallIcon/>
        </Toolbar>
        </StyledAppBar>
  );
}
