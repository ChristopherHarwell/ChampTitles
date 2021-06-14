import { IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import { CustomerContext } from '../../contexts/CustomerContexts';
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));

  const CustomerTableToolbar = (props) => {
    const deleteCustomer = (index) => {
      // axios.delete('https://champ-titles-api.herokuapp.com/')
      console.log("Hello World")
    }
  
    const classes = useToolbarStyles();
    const { numSelected } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Customers
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip onClick={deleteCustomer()} title="Delete">
            <IconButton  aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  
  CustomerTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  export default CustomerTableToolbar;