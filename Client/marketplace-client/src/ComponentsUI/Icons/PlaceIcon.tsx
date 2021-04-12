import React from "react";
import Place from '@material-ui/icons/Place';
import { Box, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuElement: {
            display: "flex",
            color: "#000000",
            '&:hover': {
                color: grey[600]
            },
            cursor: "pointer",
        },
    }),
);


export default function PlaceIcon() {
    const classes = useStyles();
    return (
        <Box className={classes.menuElement}> 
            <Place fontSize="small" />
            <Typography>
                Ivanovo
            </Typography>
        </Box>
    )
}