import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom"
import './NavBar.css'



const useStyles = makeStyles((theme)=> ({
  root: {
    flexGrow: 1,
    background: "#EE8051",
    textColor: "#0000",
    indicatorColor:"#FFFFF"
  },
 
}));


export const CenteredTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>  
        <header className="header" ><h1 className="title">Blossom Buddies</h1></header>
        <Paper className={classes.root}> 
        <Tabs
            value={value}
            onChange={handleChange}
            color ="primary"
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
