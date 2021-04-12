import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { IProductDescription } from "../../Interface/IProductDescription";

export const productDescriptionStyle = makeStyles((theme: Theme) =>
    createStyles({
        productName: {
            fontSize: 30,
            fontWeight: 200,
            maxHeight: 68,
            marginTop: 20, 
            marginBottom: 30
        }
    }),
);

export default function ProductDescriptionField(props: IProductDescription) {
    const classes = productDescriptionStyle()
    return (
        <>
            <Typography className={classes.productName}>{props.productName}</Typography>
            <Typography >{props.productDescription}</Typography>
        </>
    )
}