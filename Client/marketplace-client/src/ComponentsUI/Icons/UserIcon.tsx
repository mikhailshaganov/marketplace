import { Box, createStyles, Divider, makeStyles, Menu, MenuItem, Theme, Typography, withStyles } from "@material-ui/core";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import React, { useState } from "react";
import { grey, orange } from "@material-ui/core/colors";
import { SignOut } from "../../api/Service/UserService";

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
    },
    menuItem: {
      minWidth: 200,
      height: 50
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

export default function UserIcon() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function onLoginClick() {
    window.location.href = "/account/google-login";
  }

  async function onSignOutClick() {
    await SignOut();
  }

  return (
    <div>
      <Box className={classes.root} onClick={handleClick} >
        <PermIdentityIcon />
        <StyledTypography>
          login
        </StyledTypography>
      </Box>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem button={false} style={{pointerEvents: "none", fontWeight: 700, outline: 0}} className={classes.menuItem}>Name</MenuItem>
        <Divider />
        <MenuItem className={classes.menuItem} onClick={handleClose}>Profile</MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleClose}>Orders</MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleClose}>Bonuses</MenuItem>
        <MenuItem className={classes.menuItem} onClick={onSignOutClick}>Logout</MenuItem>
      </Menu>

    </div>
  )
}