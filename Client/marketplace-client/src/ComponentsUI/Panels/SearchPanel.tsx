import React, { useState } from "react";
import { createStyles, IconButton, Input, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import { grey } from "@material-ui/core/colors";
import { useProductCatalogStore } from "../../api/Store/RootStore";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchingPanel: {
            display: "flex",
            maxWidth: '1000px',
            width: '100%',
            height: theme.spacing(6),
        },
        iconButton: {
            color: grey[500],
        },
        input: {
            maxWidth: 1200
        },
        searchContainer: {
            margin: "auto 16px",
            width: `calc(100% - ${theme.spacing(6 + 4)}px)`,
        },
        errorMessage: {
            position: "absolute",
            bottom: -40
        }
    }))

export const SearchPanel = observer (() => {
    const classes = useStyles();
    const productCatalogStore = useProductCatalogStore();

    const [seachingText, setSeachingValue] = useState("");
    const [shouldShowError, setErrorStatus] = useState(false);

    const handleInput = (event: any) => {
        setSeachingValue(event.target.value);
        setErrorStatus(false);
    };

    const handleRequestSearch = async () => {
        if (seachingText.length > 1) {
            try {
                productCatalogStore.changeSearchingString(seachingText);
            } catch (error) {
                console.log("Something wrong:" + error.message);
                console.log("Error status: " + error.status);
            }
        } else {
            setErrorStatus(true);
        }
    };

    const handleCancel = () => {
        setSeachingValue("");
        setErrorStatus(false);
    };


    const handleKeyUp = (event: any) => {
        if (event.charCode === 13 || event.key === "Enter") {
            handleRequestSearch();
        } else if ((event.charCode === 27 || event.key === "Escape")) {
            handleCancel();
        }
    };

    return (
        <Paper className={classes.searchingPanel}>
            <div className={classes.searchContainer}>
                <Input onChange={handleInput} onKeyUp={handleKeyUp}
                    value={seachingText}
                    className={classes.input}
                    disableUnderline
                    placeholder="Search"
                    fullWidth />
            </div>
            <IconButton onClick={handleCancel} className={classes.iconButton}>
                <ClearIcon />
            </IconButton>
            <IconButton  onClick={handleRequestSearch} className={classes.iconButton}>
                <SearchIcon />
            </IconButton>
            {
                shouldShowError ? <Typography color="error" className={classes.errorMessage}>
                    Request must contain more than 1 character
            </Typography> : null
            }
        </Paper>
    );
});
