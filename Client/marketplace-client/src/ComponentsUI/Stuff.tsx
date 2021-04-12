import { Box, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { IStuff } from '../Interface/IStuff';
import StuffTemplate from '../Templates/StuffTemplate';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                marginTop: theme.spacing(2),
            },
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            maxWidth: '1500px',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
    }),
);

export default function Stuff(props: any) {
    const productData = props.products ? props.products : [];
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            {productData.map((item: IStuff) => {
                return <StuffTemplate {...item} />
            })}
        </Box>
    );

}