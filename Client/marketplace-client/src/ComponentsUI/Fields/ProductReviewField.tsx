import { Button, CircularProgress, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import GetReviewsData from "../../api/Service/ReviewService";
import CommentTemplate from "../../Templates/CommentTemplate";
import RatingCircle from "../InteractiveElements/RatingCircle";
import RatingLinear from "../InteractiveElements/RatingLinear";
import { LoadStatus } from "../../Constant/LoadingStatus";
import { IReview } from "../../Interface/IReview";
import { IReviewPoint } from "../../Interface/IReviewPoint";
import { IReviewMark } from "../../Interface/IReviewMark";

const productReviewStyle = makeStyles((theme: Theme) =>
    createStyles({
        reviewButton: {
            backgroundColor: "#FFC371",
            minWidth: 200,
            maxWidth: 200,
            marginTop: 20
        },
        ratingPanel: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
        },
        reviewHeader: {
            fontWeight: 600,
            marginTop: 25,
            marginBottom: 20
        },
        circular: {
            margin: theme.spacing(1),
            marginLeft: '50%', 
        },
    }),
);

export default function ProductReviewField(props: any) {
    const classes = productReviewStyle();
    const [reviewsData, setReviewsData] = useState(new Array<IReview>());
    const [reviewPoints, setReviewPoints] = useState<IReviewPoint>( {
        middleRate: 0,
        reviewsCount: 0,
     });

    const [reviewMarks, setReviewMarks] = useState(new Array<IReviewMark>(5));
    const [loadingStatus, setLoadingStatus] = useState<string>(
        LoadStatus.ERROR
    );

    const changeReviewsData = (reviewsData: IReview[]) => {
        setReviewsData(reviewsData);
    }

    const changeReviewsPoint = (reviewsPoint: IReviewPoint) => {
        setReviewPoints(reviewsPoint);
    }

    const changeReviewsMark = (reviewMarks: number[], reviewsCount: number) => {
        const marks: IReviewMark[] = new Array<IReviewMark>();

        for(var i:number = 0; i < reviewMarks.length; i++) {
            marks.push({
                mark: i + 1,
                markPoint: reviewMarks[i],
                markPersentValue: reviewsCount === 0 ? 0 : (reviewMarks[i] * 100) / reviewsCount
            })
        }

        setReviewMarks(marks.reverse());
    }

    useEffect(() => {
        const getReviewData = async () => {
            try {
                const result = await GetReviewsData(props.productID);
                changeReviewsData(result.reviewsDTO);
                changeReviewsPoint({
                    middleRate: result.middleRate,
                    reviewsCount: result.reviewsCount
                });
                changeReviewsMark(result.reviewPoints, result.reviewsCount);
                setLoadingStatus(LoadStatus.LOADED);
            } catch (error) {
                setLoadingStatus(LoadStatus.ERROR);
            }
        };

        setLoadingStatus(LoadStatus.LOADING);
        setTimeout(() => {
            getReviewData();
        }, 1000)
    }, [])

    return (
            <div>
                {loadingStatus === LoadStatus.LOADED ? (
                    <div>
                        <Grid container>
                            <Grid item xs={3} style={{minWidth: "30%"}}>
                                <RatingCircle {...reviewPoints} />
                                <Button variant="contained" className={classes.reviewButton}>
                                    Write review
                                     </Button>
                            </Grid>

                            <Grid item className={classes.ratingPanel}>
                                {
                                    reviewMarks.map((item: IReviewMark) => {
                                        return <RatingLinear {...item} />
                                    })
                                }
                            </Grid>
                        </Grid>
                        
                         { 
                          reviewPoints.reviewsCount === 0 ? (<Typography variant="h5" className={classes.reviewHeader}>Not reviews yet</Typography> ) :
                          (<Typography variant="h5" className={classes.reviewHeader}>Reviews {reviewPoints.reviewsCount}</Typography>) 
                         }
        
                         {
                            reviewsData.map((item: IReview) => {
                                return <CommentTemplate {...{ rate: item.rate, comment: item.description }} />
                            })
                         }
                    </div>) : (
                        <CircularProgress className={classes.circular} />
                    )}
            </div>
    )
}