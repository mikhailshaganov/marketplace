import { Box, Button, createStyles, makeStyles, Paper, TextField, Theme, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DropzoneDialog } from 'material-ui-dropzone'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { Color } from '@material-ui/lab/Alert';
import { CreateNewProduct, DeleteProduct, GetProductData, UpdateProduct } from "../api/Service/ProductService";
import { IPostProduct } from "../Interface/IPostProduct";
import { useParams } from "react-router";
import { IStuff } from "../Interface/IStuff";
import { LoadStatus } from "../Constant/LoadingStatus";
import CircularProgress from '@material-ui/core/CircularProgress';
import { ProductUpdatingPageStyle } from "../Styles/ProductUpdatingPageStyle";
import { ResponseStatus } from "../Constant/ResponseStatus";


export default function ProductUpdatingPage() {
    const classes = ProductUpdatingPageStyle();

    const { productID }: any = useParams();
    const [product, setProductData] = useState<IStuff>();
    const [needDataRefresh, setDataRefresh] = useState<boolean>(false);

    const [productImage, setProductImage] = useState<any>({
        url: "/images/base.png",
        file: "",
        name: ""
    });

    const [alertMessage, setAlertMessage] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const [productName, setProductName] = useState({
        name: "",
        invalid: true
    });

    const [productDescription, setProductDescription] = useState({
        description: "",
        invalid: true
    });

    const [productPrice, setProductPrice] = useState({
        price: 0,
        invalid: true
    });

    const [productQuantity, setProductQuantity] = useState({
        quantity: 0,
        invalid: true
    });

    const [openDropzone, setOpenDropzone] = useState<boolean>(false);
    const [activeSaveButton, setDisableSaveButton] = useState<boolean>(false);
    const [activeDeleteButton, setDisableDeleteButton] = useState<boolean>(productID ? false : true);

    const [loadingStatus, setLoadingStatus] = useState<string>(
        LoadStatus.LOADED
    );

    const handleCloseDropzone = () => {
        setOpenDropzone(false);
    }

    const handleCloseAlert = () => {
        setAlertMessage({
            open: false,
            message: alertMessage.message,
            severity: alertMessage.severity
        });
    }

    const changeActiveSaveButton = (state: boolean) => {
        setDisableSaveButton(state);
    }

    const changeActiveDeleteButtton = (state: boolean) => {
        setDisableDeleteButton(state);
    }

    const getImageUniqueCodeName = (url: string) => {
        return url.split("/").slice(-1)[0] + ".png";
    }

    const handleSaveImage = (files: any) => {
        setOpenDropzone(false);
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
            const url = URL.createObjectURL(files[0])
            setProductImage({
                url: url,
                file: files[0],
                name: getImageUniqueCodeName(url)
            });
        };
    }

    const handleOpenDropzone = () => {
        setOpenDropzone(true)
    }

    const handleNameChange = (event: any) => {
        const productName: string = event.target.value || "";
        setProductName({
            name: productName,
            invalid: productName.length < 3
        });
    }

    const handleDescriptionChange = (event: any) => {
        const productDescription: string = event.target.value || "";
        setProductDescription({
            description: productDescription,
            invalid: productDescription.length < 50
        });
    }

    const handlePriceChange = (event: any) => {
        const productPrice: string = event.target.value || "0";

        if (Number.isInteger(productPrice)) {
            return;
        }

        setProductPrice({
            price: +productPrice,
            invalid: +productPrice < 1
        });
    }

    const handleQuatityChange = (event: any) => {
        const productQuantity: string = event.target.value || "0";

        if (Number.isInteger(productQuantity)) {
            return;
        }

        setProductQuantity({
            quantity: +productQuantity,
            invalid: +productQuantity < 0
        });
    }

    const handleSave = async () => {
        if (productName.invalid || productDescription.invalid || productPrice.invalid || productQuantity.invalid) {
            setAlertMessage({
                open: true,
                message: "All fields must be correct",
                severity: "error"
            });
            return;
        }

        let responseStatus = 200

        try {
            const productData: IPostProduct = {
                Id: product?.id || 0,
                ProductName: productName.name,
                Description: productDescription.description,
                Price: productPrice.price,
                Quantity: productQuantity.quantity,
                ImageName: productImage.name
            }

            const productFormData = new FormData();
            productFormData.append("product", JSON.stringify(productData));
            productFormData.append("image", productImage.file);

            if (product) {
                responseStatus = await UpdateProduct(productFormData);
            } else {
                responseStatus = await CreateNewProduct(productFormData);
            }

            if (responseStatus === ResponseStatus.OK) {
                changeActiveSaveButton(true);
                changeActiveDeleteButtton(true);
                setAlertMessage({
                    open: true,
                    message: `Changes were saved`,
                    severity: "success"
                })

                setTimeout(() => {
                    if (product) {
                        setDataRefresh(!needDataRefresh);
                        changeActiveSaveButton(false);
                        changeActiveDeleteButtton(false);
                    } else {
                        dropProductData();
                    }
                }, 1000)

            }
        } catch (error) {
            setAlertMessage({
                open: true,
                message: `Something wrong: ${responseStatus}`,
                severity: "error"
            })
        }
    }

    const handleDelete = async () => {
        let responseStatus = 200;
        if (product) {
            try {
                responseStatus = await DeleteProduct(product.id);
                if (responseStatus === ResponseStatus.OK) {
                    changeActiveSaveButton(true);
                    changeActiveDeleteButtton(true);
                    setAlertMessage({
                        open: true,
                        message: `Product was deleted`,
                        severity: "success"
                    });

                    setTimeout(() => {
                        window.location.href = "/management/products";
                    }, 1000);
                }
            } catch (error) {
                console.log("message: " + error.message + "; ERROR CODE: " + responseStatus)
            }

        }
    }

    const dropProductData = () => {
        setProductName({
            name: "",
            invalid: true,
        });

        setProductDescription({
            description: "",
            invalid: true,
        });

        setProductPrice({
            price: 0,
            invalid: true,
        });

        setProductQuantity({
            quantity: 0,
            invalid: true,
        });

        setProductImage({
            url: "/images/base.png",
            file: "",
            name: ""
        });

        changeActiveSaveButton(false);
        changeActiveDeleteButtton(false);
    }


    useEffect(() => {
        const getProductData = async () => {
            try {
                const result = await GetProductData(productID);
                setProductData(result);
                setProductName({
                    name: result.productName,
                    invalid: result.productName.length < 3,
                });
                setProductDescription({
                    description: result.description,
                    invalid: result.description.length < 50,
                });
                setProductPrice({
                    price: result.price,
                    invalid: +result.price < 1
                });
                setProductQuantity({
                    quantity: result.quantity,
                    invalid: +result.quantity < 0
                });
                setProductImage({
                    url: result.image,
                    file: "",
                    name: result.image.split("/").slice(-1)[0]
                });
                setLoadingStatus(LoadStatus.LOADED);
            } catch (error) {
                setLoadingStatus(LoadStatus.ERROR);
            }
        };

        if (productID) {
            setLoadingStatus(LoadStatus.LOADING);
            setTimeout(() => {
                getProductData();
            }, 1000)
        }
    }, [needDataRefresh])

    return (
        <Box boxShadow={3} bgcolor="background.paper" className={classes.root}>
            {loadingStatus === LoadStatus.LOADED ? (
                <div>
                    <Box className={classes.inputRow}>
                        <Typography className={classes.inputTypography}>
                            Product Name
                            </Typography>
                        <Paper>
                            <TextField
                                label="Product Name"
                                variant="outlined"
                                value={productName.name}
                                error={productName.invalid}
                                className={classes.inputField}
                                onChange={handleNameChange} />
                        </Paper>
                    </Box>
                    <Box className={classes.inputRow}>
                        <Typography className={classes.inputTypography}>
                            Description
                            </Typography>
                        <Paper>
                            <TextField
                                value={productDescription.description}
                                variant="outlined"
                                label="Description"
                                className={classes.inputField}
                                error={productDescription.invalid}
                                onChange={handleDescriptionChange}
                                multiline />
                        </Paper>
                    </Box>
                    <Box className={classes.inputRow}>
                        <Typography className={classes.inputTypography}>
                            Price
                            </Typography>
                        <Paper>
                            <TextField
                                value={productPrice.price}
                                variant="outlined"
                                label="Price"
                                error={productPrice.invalid}
                                onChange={handlePriceChange}
                                className={classes.inputField} />
                        </Paper>
                    </Box>
                    <Box className={classes.inputRow}>
                        <Typography className={classes.inputTypography}>
                            Quantity
                            </Typography>
                        <Paper>
                            <TextField
                                value={productQuantity.quantity}
                                variant="outlined"
                                label="Quantity"
                                error={productQuantity.invalid}
                                onChange={handleQuatityChange}
                                className={classes.inputField} />
                        </Paper>
                    </Box>
                    <Box className={classes.inputRow}>
                        <Typography className={classes.inputTypography}>
                            Image
                            </Typography>
                        <Box className={classes.imageDropZone}>
                            <img src={productImage.url} className={classes.productImage} />
                            <Button variant="contained" className={classes.buttonUpload} onClick={handleOpenDropzone}>
                                Upload  Image
                                </Button>
                            <DropzoneDialog
                                open={openDropzone}
                                onSave={handleSaveImage}
                                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                showPreviews={true}
                                filesLimit={1}
                                onClose={handleCloseDropzone}
                            />
                        </Box>
                    </Box>

                    <Box className={classes.inputRow}>

                        <Button variant="contained" disabled={activeSaveButton} className={classes.saveDelButton} onClick={handleSave} >
                            Save
                        </Button>

                        <Button variant="contained" disabled={activeDeleteButton} className={classes.saveDelButton} onClick={handleDelete} >
                            Delete
                        </Button>

                    </Box>

                    <Snackbar open={alertMessage.open} autoHideDuration={4000} onClose={handleCloseAlert}>
                        <MuiAlert onClose={handleCloseAlert} severity={alertMessage.severity as Color}>
                            {alertMessage.message}
                        </MuiAlert>
                    </Snackbar>
                </div>) : (
                <CircularProgress className={classes.circular} />
            )}

        </Box>
    );
}