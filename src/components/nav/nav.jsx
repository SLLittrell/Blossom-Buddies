import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom"


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export const CenteredTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>  
        <h3>Blossom Buddies</h3>
        <Paper className={classes.root}>
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="Home" to="/" component={ Link } />
            <Tab label="My Gardens" to="/gardens" component={ Link }/>
            <Tab label="Plant List" to="/plants" component={ Link }/>
        </Tabs>
        </Paper>
    </>
  );
}
