import { Button, Theme, Typography, withStyles } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import React from "react";

const ColorButton = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: "#000000",
        color: "#ffffff",
        minWidth: 150,
        justifyContent: "start",
        '&:hover': {
            backgroundColor: "#000000",
          },
        
    },
}))(Button);

export default function MainMenuIcon() {

    return (
        <ColorButton >
            <MenuIcon style={{marginRight: 23}}/>
            <Typography variant="body2" >
                Catalog
            </Typography>
        </ColorButton>
    )
}