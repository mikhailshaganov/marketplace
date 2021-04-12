import React, { useEffect, useState } from 'react';
import { IStuff } from '../Interface/IStuff';
import { LoadStatus } from '../Constant/LoadingStatus';
import GetProductsData, { DeleteProduct } from '../api/Service/ProductService';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Button, createStyles, makeStyles, Theme, Typography, withStyles } from '@material-ui/core';
import { DataGrid, GridColDef, GridCellParams } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            height: 800,
            width: 1500,
            marginLeft: "auto",
            marginRight: "auto"
        },
        circular: {
            margin: theme.spacing(1),
            top: '50%',
            left: '50%',
            position: "fixed"
        },
        updateButton: {
            textDecoration: 'none',
        },
        linkStyle: {
            textDecoration: 'none',
            color: "inherit"
        },
        productImage: {
            width: "auto",
            height: 100,
            backgroundSize: "contain"
        }
    }),
);

const OrangeButton = withStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: "#FFC371"
        },
    }),
)(Button);

export default function ManagementProductsPage() {
    const classes = useStyles();

    const [products, setProductsData] = useState(new Array<IStuff>());
    const [loadingStatus, setLoadingStatus] = useState<string>(
        LoadStatus.ERROR
    );
    const [requestParams, setRequestParams] = useState<string>("getall=true");
    const [updateComponent, setUpdateComponent] = useState<boolean>(false);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'productName', headerName: 'Name', width: 300 },
        { field: 'description', headerName: 'Description', width: 500 },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 90,
            align: "center",
            headerAlign: "center"
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 160,
            type: 'number',
            align: "center",
            headerAlign: "center"
        },
        {
            field: 'image',
            headerName: 'Image',
            type: "image",
            filterable: false,
            sortable: false,
            width: 150,
            renderCell: (params: GridCellParams) => (
                <img src={params.value as string} className={classes.productImage} />
            )
        },
        {
            field: 'update',
            filterable: false,
            headerName: 'Update/Delete',
            sortable: false,
            width: 180,
            headerAlign: "center",
            renderCell: (params: GridCellParams) => (
                <div>
                    <Link to={'/management/products/editing/' + params.row.id} style={{ textDecoration: 'none' }}>
                        <OrangeButton variant="contained">
                            Update
                        </OrangeButton>
                    </Link>
                    <OrangeButton variant="contained" style={{ marginLeft: 5 }} onClick={(event) => DeleteProductHandle(event, +params.row.id)}>
                        <DeleteIcon />
                    </OrangeButton>
                </div>
            ),
        }
    ];

    useEffect(() => {
        const getProductsData = async () => {
            try {
                const result = await GetProductsData(requestParams);
                setProductsData(result.productsDTO);
                setLoadingStatus(LoadStatus.LOADED);
            } catch (error) {
                setLoadingStatus(LoadStatus.ERROR);
            }
        };

        setLoadingStatus(LoadStatus.LOADING);
        setTimeout(() => {
            getProductsData();
        }, 1000)
    }, [requestParams, updateComponent]);

    const DeleteProductHandle = async (event: any, productId: number) => {
        let response = await DeleteProduct(productId);
        setUpdateComponent(!updateComponent);
        console.log(response);
    }

    return (
        <div style={{ minHeight: "900px" }}>
            {loadingStatus === LoadStatus.LOADED ? (
                <div className={classes.root}>
                    <Typography variant="h4">Admin tools</Typography>
                    <Box style={{ marginBottom: 10 }}>
                        <Link className={classes.linkStyle} to={`/management/products/create`}>
                            <OrangeButton variant="contained">
                                Create Product
                            </OrangeButton>
                        </Link>
                    </Box>
                    <DataGrid checkboxSelection={false} rowHeight={100} rows={products} columns={columns} pageSize={6} />
                </div>) : (
                <CircularProgress className={classes.circular} />
            )}
        </div>
    )
}