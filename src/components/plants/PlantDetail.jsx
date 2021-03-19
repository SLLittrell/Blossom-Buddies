import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const HelperListDividers = ({helpers}) => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="helpers">
      <ListItem button>
        <ListItemText primary={helpers} />  
        {/* {helperObj.map(helper =><ListItemText primary={helper} /> )} */}
      </ListItem>
    </List>
  );
}
