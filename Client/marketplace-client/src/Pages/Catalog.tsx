import React, { useEffect, useState } from 'react';
import Stuff from '../ComponentsUI/Stuff';
import Pagination from '@material-ui/lab/Pagination';
import { CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import { ProductSortAttr } from '../Constant/ProductSortAttr';
import FilteringGroup from '../ComponentsUI/Panels/FilteringGroup';
import { IFilteringGroup } from '../Interface/IFilteringGroup';
import { SortingDirection } from '../Constant/SortingDirection';
import { observer } from "mobx-react-lite" // Or "mobx-react".
import { useProductCatalogStore } from '../api/Store/RootStore';
import { LoadStatus } from '../Constant/LoadingStatus';
import { IStuff } from '../Interface/IStuff';

const useStyles = makeStyles((theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
        filters: {
            marginTop: 20,
            display: "table",
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        pagination: {
            marginBottom: 40,
            display: "table",
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        circular: {
            margin: theme.spacing(1),
            top: '50%',
            left: '50%',
            position: "fixed"
        },
    }),
);

export const Catalog = observer(() => {
    const classes = useStyles();
    const productCatalogStore = useProductCatalogStore();

    const products: IStuff[] = productCatalogStore.productsDTO;
    const paginationCount: number = productCatalogStore.paginationCount;
    const paginationPage: number = productCatalogStore.paginationPage;
    const loadingStatus: LoadStatus = productCatalogStore.loadingStatus;

    const settingFilteringGroup: IFilteringGroup = ({
        sortOrder: productCatalogStore.sortOrder,
        setSortOrder: onSortOrderChange,
        setPaginationPage: onPaginationPageChange
    });

    function onPaginationPageChange(pageNumber: number) {
        productCatalogStore.changePaginationPage(pageNumber);
    }

    function onSortOrderChange(sortAttr: ProductSortAttr, sortDirection: SortingDirection) {
        productCatalogStore.changeSortOrder({
            sortAttr: sortAttr,
            sortDirection: sortDirection
        })
    }

    useEffect(() => {
        const getProductsData = () => {
            try {
                productCatalogStore.updateData();
            } catch (error) {
                console.log("Something wrong:" + error.message);
                console.log("Error status: " + error.status);
            }
        };

        getProductsData();
    }, [])

    return (
        <div>
            {loadingStatus === LoadStatus.LOADED ? (
                <div>
                    <FilteringGroup {...(settingFilteringGroup)} />
                    <Stuff products={products} />
                    <Pagination onChange={(e, pageNumber) => onPaginationPageChange(pageNumber)} page={paginationPage} count={paginationCount} variant="outlined" shape="rounded" className={classes.pagination} />
                </div>
            ) : (
                <CircularProgress className={classes.circular} />
            )}
        </div>
    );

});