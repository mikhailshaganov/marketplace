import { Box, Checkbox, CheckboxProps, CircularProgress, FormControlLabel, FormGroup, Grid, List, ListItemIcon, ListItemText, Paper, Typography, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProductData } from "../api/Service/ProductService";
import { LoadStatus } from "../Constant/LoadingStatus";
import { IStuff } from "../Interface/IStuff";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from "@material-ui/lab/Rating";
import { CartButton } from "../ComponentsUI/Buttons/CartButton";
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { orange } from "@material-ui/core/colors";
import DescriptionIcon from '@material-ui/icons/Description';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { ProductContent } from '../Constant/ProductContent';
import { ProductCardStyles } from '../Styles/ProductCardStyles';
import ListItem from '@material-ui/core/ListItem';
import ProductDescriptionField from '../ComponentsUI/Fields/ProductDescriptionField'
import ProductReviewField from '../ComponentsUI/Fields/ProductReviewField'

const OrangeCheckbox = withStyles({
    root: {
        '&$checked': {
            color: "#FFC371",
        },
        '&:hover': {
            color: orange[400]
        },
        cursor: "pointer",
        display: "flex"
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export default function ProductCard() {
    const { productID }: any = useParams();
    const [product, setProductData] = useState<IStuff>();
    const [loadingStatus, setLoadingStatus] = useState<string>(
        LoadStatus.ERROR
    );

    const [isFavorites, setFavoritesStatus] = useState<boolean>(false);
    const [isCompare, setCompareStatus] = useState<boolean>(false);
    const [contentValue, setContentValue] = useState<ProductContent>(ProductContent.DESCRIPTION);

    const classes = ProductCardStyles();

    const changeFavoritesStatus = () => {
        setFavoritesStatus(!isFavorites);
    }

    const changeCompareStatus = () => {
        setCompareStatus(!isCompare);
    }

    const changeContentValue = (productContent: ProductContent) => (e: React.MouseEvent) => {
        setContentValue(productContent);
    }

    const PageContent = (product: IStuff) => {
        switch (contentValue) {
            case ProductContent.DESCRIPTION: {
                return (
                    <ProductDescriptionField {...{ productName: product.productName, productDescription: product.description }} />
                )
            }

            case ProductContent.REVIEW: {
                return (
                    <ProductReviewField productID={product.id}/>
                )
            }
        }
    }

    useEffect(() => {
        const getProductData = async () => {
            try {
                const result = await GetProductData(productID);
                setProductData(result);
                setLoadingStatus(LoadStatus.LOADED);
            } catch (error) {
                setLoadingStatus(LoadStatus.ERROR);
            }
        };

        setLoadingStatus(LoadStatus.LOADING);
        setTimeout(() => {
            getProductData();
        }, 1000)
    }, [])

    return (
        product && loadingStatus === LoadStatus.LOADED ? (
            <div>
                <Card className={classes.root}>
                    <CardContent className={classes.media}>
                        <CardMedia className={classes.imageContent}
                            image={product?.image}
                        />
                    </CardContent>

                    <CardContent>
                        <Typography gutterBottom component="h1" className={classes.productName} >
                            {product?.productName}
                        </Typography>

                        <Typography variant="h6" className={classes.price}>
                            {product?.price} $
                        </Typography>

                        <Rating name="half-rating-read" value={product?.rate || 0} precision={0.5} readOnly />
                        <Typography className={classes.textField}> Rate: {product?.rate || 0} </Typography>
                        <Typography className={classes.textField}> Voices: {product?.vote || 0} </Typography>
                        <Typography style={{ marginTop: 16 }} className={classes.textField}> In Stock: {product?.quantity}</Typography>

                        <Box mt={8} ><CartButton {...product} /></Box>

                        <FormGroup row>
                            <FormControlLabel
                                className={classes.specialButton}
                                control={<OrangeCheckbox onChange={changeFavoritesStatus} icon={<FavoriteBorder />} checked={isFavorites} checkedIcon={<Favorite />} />}
                                label="Favorites"
                            />

                            <FormControlLabel
                                className={classes.specialButton}
                                control={<OrangeCheckbox checked={isCompare} onChange={changeCompareStatus} />}
                                label="Compare"
                            />
                        </FormGroup>
                    </CardContent>
                </Card>


                <Box style={{ marginTop: 40 }} className={classes.root}>
                    <Grid container className={classes.contentField}>
                        <Grid item xs={2}>
                            <Paper>
                                <List>
                                    <ListItem button onClick={changeContentValue(ProductContent.DESCRIPTION)}>
                                        <ListItemIcon><DescriptionIcon /></ListItemIcon>
                                        <ListItemText primary={"Description"} />
                                    </ListItem>
                                </List>
                                <List>
                                    <ListItem button onClick={changeContentValue(ProductContent.REVIEW)}>
                                        <ListItemIcon><StarBorderIcon /></ListItemIcon>
                                        <ListItemText primary={"Reviews"} />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>

                        <Grid item xs={9}>
                            <Paper>
                                <Box style={{ padding: 20, marginBottom: 20 }}>
                                    {PageContent(product)}
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        ) : (
            <CircularProgress className={classes.circular} />
        )
    );
}