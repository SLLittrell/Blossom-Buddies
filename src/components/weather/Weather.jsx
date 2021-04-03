import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from './WeatherProvider';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./Weather.css"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
});

export const WeatherPreview =() => { 
  const {weather, getWeather} = useContext(WeatherContext)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
 

    useEffect(() =>{
        getWeather()
    },[])

    const weatherObj= weather.daily?.slice(0,1)
    const weatherObject= weather.daily?.slice(0,5)
    const currentWeather = weather?.current
    const conditions = currentWeather?.weather.map(now =>now.icon)
  return (
    <Card className={classes.root}>
      <CardContent>
        {weatherObj?.map((dailyobj,i) =><><Typography key={i} className={classes.title} color="textSecondary" gutterBottom>
        {new Date(dailyobj.dt * 1000).toDateString("en-US")}
        </Typography>
        <Typography className="currentWeather">
            <div>Currently: {Math.round(weather.current.temp)}</div>
            {currentWeather?.weather.map(now =>now.main)}
            <img src={`http://openweathermap.org/img/wn/${conditions}@2x.png`} size="5%"></img>
            <div>High: {Math.round(dailyobj.temp.max)}<br></br> 
            Low: {Math.round(dailyobj.temp.min)}</div>
        </Typography></>)}
        
      </CardContent>
      <CardActions>
        <Button size="small"></Button>
      </CardActions>
    </Card>
  );
}


