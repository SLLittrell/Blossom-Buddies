import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from './WeatherProvider';
import { makeStyles } from '@material-ui/core/styles';
import "./Weather.css"
import {TransitionsModal} from "./WeatherModal"
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  root: {
    minWidth: 275,
    background:"rgba(104, 173, 175, 0.411)"
  },
  title: {
    fontSize: 15,
    width: 150,
  }
}));



export const WeatherPreview =() => { 
  const {weather, getWeather} = useContext(WeatherContext)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    useEffect(() =>{
        getWeather()
    },[])

    const weatherObj= weather.daily?.slice(0,1)
    const weatherObject= weather.daily?.slice(0,5)
    const currentWeather = weather?.current
    const conditions = currentWeather?.weather.map(now =>now.icon)


  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Weather
      </button>
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
            <Card className={classes.root}>
                <CardContent>
                    {weatherObj?.map((dailyobj,i) =><><Typography key={i} className={classes.title} color="textSecondary" gutterBottom>
                    {new Date(dailyobj.dt * 1000).toDateString("en-US")}
                    </Typography>
                    <Typography className="currentWeather">
                        <div className=""><img src={`http://openweathermap.org/img/wn/${conditions}@2x.png`}></img><br></br>
                        {currentWeather?.weather.map(now =>now.main)}<br></br>{Math.round(weather.current.temp)} 
                        <div className="currentWeather">High {Math.round(dailyobj.temp.max)} 
                        Low {Math.round(dailyobj.temp.min)}</div></div>
                    </Typography></>)}
                </CardContent>
            </Card>
        </Fade>
      </Modal>
    </div>
  );


}




