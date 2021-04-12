import { createStyles, makeStyles } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

export const ProductCardStyles = makeStyles((theme) =>
    createStyles({
        circular: {
            margin: theme.spacing(1),
            top: '50%',
            left: '50%',
            position: "fixed"
        },
        root: {
            flexDirection: "row",
            marginTop: 15,
            display: "flex",
            minWidth: 1024,
            maxWidth: 1500,
            marginLeft: "auto",
            marginRight: "auto",
        },
        media: {
            maxWidth: 450,
            minWidth: 450,
        },
        imageContent: {
            backgroundSize: "contain",
            minWidth: 450,
            minHeight: 466
        },
        productName: {
            fontSize: 30,
            fontWeight: 200,
            maxHeight: 68,
        },
        textField: {
            fontSize: 18,
        },
        price: {
            fontSize: 36,
            fontWeight: 700,
            marginTop: 30,
            marginBottom: 30
        },
        specialButton: {
            '&:hover': {
                color: orange[400]
            },
            cursor: "pointer",
            display: "flex"
        },
        contentField: { 
            justifyContent: "space-between" 
        }
    }),
);