import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const HelperListDividers = ({helpers, plantFilter}) => {
  const classes = useStyles();
  const matchPlant =plantFilter?.find(name => helpers?.includes(name.commonName.toLowerCase()))
  // const helperId = matchPlant ? `/plants/details/${matchPlant?.id}` : "/plants"
  console.log(matchPlant)

 
  return (
    <List component="nav" className={classes.root} aria-label="helpers">
      <Link to={`/plants/details/${matchPlant?.id}`}><ListItem >
        <ListItemText primary={helpers} />  
      </ListItem></Link>
      <Divider light />
    </List>
  );
}
export const AvoidListDividers = ({NonHelpers}) => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="helpers">
      <ListItem button to={"/plants"} component={Link}>
        <ListItemText primary={NonHelpers} />  
      </ListItem>
      <Divider light />
    </List>
  );
}
