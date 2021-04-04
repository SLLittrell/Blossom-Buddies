import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from './WeatherProvider';
import "./Weather.css"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloudIcon from '@material-ui/icons/Cloud';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));



export const WeatherPreview =() => { 
  const {weather, getWeather} = useContext(WeatherContext)
  


    useEffect(() =>{
        getWeather()
    },[])

    const weatherObj= weather.daily?.slice(0,3)
    // const conditions = weatherObj.weather?.map(now =>now.main)

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <div className="weatherPath">Weather<br></br>
        <CloudIcon className="weatherIcon" type="button" onClick={handleOpen}/></div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className="weather">
                <h3>3 Day Forecast</h3>
                <div className="dailyWeather">
                {weatherObj?.map((dailyobj,i) =>
                <div key={i} className="weatherDay" >{new Date(dailyobj.dt * 1000).toDateString("en-US")}
                {dailyobj.weather.map(icon =><div><img src={`http://openweathermap.org/img/wn/${icon.icon}@2x.png`}></img><br></br>{icon.description}</div>)}<br></br> 
                <div className="currentWeather">High {Math.round(dailyobj.temp.max)}<br></br> 
                Low {Math.round(dailyobj.temp.min)}</div></div>)} </div>
            </div> 
          </Fade>
        </Modal>
      </div>
    );

}




