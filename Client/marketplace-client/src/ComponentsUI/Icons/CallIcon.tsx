import React from "react";
import Call from '@material-ui/icons/Call';
import { Box, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuElement: {
            display: "flex",
            color: "#000000",
            minWidth: 256
        },
    }),
);


export default function CallIcon() {
    const classes = useStyles();
    return (
        <Box className={classes.menuElement}> 
            <Call fontSize="small" />
            <Typography style={{ fontWeight: 600, fontSize: 14}}>
                8-800-555-35-35
             </Typography>
             <Typography style={{ fontSize: 14, marginLeft: 4}}>
             (from 3am to 10pm)  
             </Typography>
        </Box>
    )
}