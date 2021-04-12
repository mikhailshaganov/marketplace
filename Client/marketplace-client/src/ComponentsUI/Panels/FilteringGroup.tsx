import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ProductSortAttr } from '../../Constant/ProductSortAttr';
import SortIcon from '@material-ui/icons/Sort';
import { createStyles, makeStyles } from '@material-ui/core';
import { IFilteringGroup } from '../../Interface/IFilteringGroup';
import { SortingDirection } from '../../Constant/SortingDirection';

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
        iconAsc: {
            transform: `rotate(${1}turn)`
        },
        iconDesc: {
            transform: `rotate(${0.5}turn)`
        }
    }),
);


export default function FilteringGroup(props: IFilteringGroup) {
    const classes = useStyles();

    function handleSort(event: React.MouseEvent<HTMLElement>, sortAttr: ProductSortAttr) {
        if (sortAttr !== null) {
            props.setSortOrder(sortAttr, SortingDirection.ASC);
            props.setPaginationPage(1);
            return;
        }

        if (props.sortOrder) {
            if (props.sortOrder.sortAttr !== ProductSortAttr.RATE && props.sortOrder.sortAttr !== ProductSortAttr.RELEVANCE) {
                props.setSortOrder(props.sortOrder.sortAttr, props.sortOrder.sortDirection === SortingDirection.ASC ? SortingDirection.DESC: SortingDirection.ASC);
                props.setPaginationPage(1);
            }
        }
    };

    return (
        <div>
            <ToggleButtonGroup value={props.sortOrder.sortAttr || ProductSortAttr.NONE} exclusive onChange={handleSort} aria-label="text alignment" className={classes.filters}>
                <ToggleButton value={ProductSortAttr.RELEVANCE} size="small" className={classes.margin}>
                    By default
                </ToggleButton >
                <ToggleButton value={ProductSortAttr.PRICE} size="small" className={classes.margin}>
                    By price
                    {props.sortOrder.sortAttr === ProductSortAttr.PRICE && ( 
                    <SortIcon className={props.sortOrder.sortDirection === SortingDirection.ASC ? classes.iconAsc : classes.iconDesc } /> ) }
                </ToggleButton > 
                <ToggleButton value={ProductSortAttr.NAME} size="small" className={classes.margin}>
                    By name
                    {props.sortOrder.sortAttr === ProductSortAttr.NAME && (
                    <SortIcon className={props.sortOrder.sortDirection === SortingDirection.ASC ? classes.iconAsc : classes.iconDesc } /> ) }
                </ToggleButton >
                <ToggleButton value={ProductSortAttr.RATE} size="small" className={classes.margin}>
                    By rate
            </ToggleButton >
            </ToggleButtonGroup>
        </div>
    );
}