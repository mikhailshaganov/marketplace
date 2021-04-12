import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useState } from "react";
import {CartIcon} from "../Icons/CartIcon";
import UserIcon from "../Icons/UserIcon";
import FavoritesIcon from "../Icons/FavoritesIcon";
import { SearchPanel } from './SearchPanel';
import CompareIcon from '../Icons/CompareIcon';
import MainMenuIcon from '../Icons/MainMenuIcon';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 90,
            top: 33,
            zIndex: 15,
            position: "sticky",
            width: "100%"
        },
        cartIcon: {
            textDecoration: 'none',
        },
        toolbar: {
            position: "relative",
            maxWidth: 1500,
            justifyContent: "space-between",
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            top: 15
        },
        menuPanel: {
            display: "flex", 
            position: "static", 
            width: "auto", 
            bottom: 0, 
            left: 0, 
            minWidth: 300, 
            justifyContent: "space-between"
        }
    }))

export default function HeaderSearch() {
    const classes = useStyles();

    return (
        <Box boxShadow={3} bgcolor="background.paper" className={classes.root} >
            <Toolbar className={classes.toolbar}>
                <MainMenuIcon/>
                <SearchPanel />
                <Box className={classes.menuPanel}>
                    <UserIcon />
                    <FavoritesIcon />
                    <CompareIcon />
                    <Link to='/cart' className={classes.cartIcon}>
                        <CartIcon />
                    </Link>
                </Box>
            </Toolbar>
        </Box>
    )
}
