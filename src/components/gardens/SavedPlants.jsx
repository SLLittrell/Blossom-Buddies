import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const SavedPlantDividers = ({myPlants}) => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="helpers">
      <ListItem button to={`/plants/details/${myPlants?.id}`} component={Link}>
        <ListItemText primary={myPlants.commonName} />  
      </ListItem>
    </List>
  );
}

