/*Module Purpose:
This module is responsible for rendering the JSX and styling for plant lists in plant details adn
filtering matching plant list to find the matching plant common name.  
*/
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color:"#587085"
  },
}));

const LinkStyles = makeStyles((theme) => ({
  root: {
    color:"#587085",
    textDecoration: 'none'
    
  },
}));

export const HelperListDividers = ({helpers, plantFilter}) => {
  const classes = useStyles();

  const links = LinkStyles();
  
  //filters though passed plant array to find a matching common name
  const matchPlant =plantFilter?.find(name => helpers?.includes(name.commonName.toLowerCase()))
 
  return (
    <List component="nav" className={classes.root} aria-label="helpers">
      {matchPlant ? <Link className={links.root} to={`/plants/details/${matchPlant?.id}`}>
      <ListItem >
        <ListItemText primary={helpers} /><AddCircleIcon/> 
      </ListItem></Link> :
      <ListItem >
        <ListItemText primary={helpers} />  
      </ListItem>}
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
