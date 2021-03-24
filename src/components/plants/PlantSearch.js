/*Module Purpose:
This module is responsible for rendering and styling an affordance to search plant list 
*/
import React, {useContext} from "react"
import { PlantContext } from "./PlantProvider"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

//sets search terms for plant list component when user inputs character into search field the search state changes
export const PlantSearch = () => {
    const {setSearchTerms} = useContext(PlantContext)

    const classes = useStyles();

    return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Search Plants" onKeyUp={(event) => setSearchTerms(event.target.value)}/>
    </form>
  )


}