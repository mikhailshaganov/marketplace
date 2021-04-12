import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const ProductUpdatingPageStyle = makeStyles((theme: Theme) =>
    createStyles({
        inputRow: {
            display: "flex",
            width: '100%',
            minHeight: 80,
            alignItems: "center",
        },
        root: {
            marginTop: 15,
            display: "flex",
            minWidth: 1024,
            maxWidth: 1500,
            marginLeft: "auto",
            marginRight: "auto",
            flexDirection: "column"
        },
        inputTypography: {
            width: 300,
            marginLeft: 30
        },
        inputField: {
            height: "100%",
            minWidth: 500,
        },
        header: {
            marginLeft: 30,
            marginTop: 15
        },
        buttonUpload: {
            maxWidth: 200,
            marginTop: 10,
            backgroundColor: "#FFC371"
        },
        saveDelButton: {
            margin: 20,
            backgroundColor: "#000000",
            color: "#ffffff",
            minWidth: 100
        },
        circular: {
            margin: theme.spacing(1),
            top: '50%',
            left: '50%',
            position: "fixed"
        },
        imageDropZone: {
            display: "flex", 
            flexDirection: "column" 
        },
        productImage: {
            width: "530",
            height: "auto",
            backgroundSize: "contain"
        }

    }));