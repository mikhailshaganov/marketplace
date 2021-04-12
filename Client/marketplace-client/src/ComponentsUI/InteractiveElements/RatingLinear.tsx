import React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { orange } from '@material-ui/core/colors';
import { Box } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { IReviewMark } from '../../Interface/IReviewMark'

const BorderLinearProgress = withStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 24,
            borderRadius: 5,
            minWidth: 400
        },
        bar: {
            borderRadius: 5,
            backgroundColor: orange[400],
        },
    }),
)(LinearProgress);

const LinearContent = withStyles({
    root: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        minWidth: 450
    }
})(Box)

export default function RatingLiner(props: IReviewMark) {
    const starIcons = [];

    for (var i = 0; i < props.mark; i++) {
        starIcons.push(<StarIcon/>)
    }

    return (
        <Box>
            <Typography style={{ marginLeft: 5 }}>{props.markPoint} reviews</Typography>
            <LinearContent>
                <BorderLinearProgress variant="determinate" value={props.markPersentValue} />
                {
                   starIcons.map((item: any) => {
                        return item
                   })
                }
            </LinearContent>
        </Box>
    );
}