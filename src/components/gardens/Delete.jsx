import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { GardenContext } from "./GardenProvider"
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      color:"#cb0004",
      margin: 10
    }
  }));

export const DeleteDialog =({garden})=>{
  const [open, setOpen] = React.useState(false);
  const {DeleteGarden} =useContext(GardenContext)

  const history= useHistory()

  const classes =useStyles()
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    DeleteGarden(garden?.id)
    .then(() => {
        history.push("/gardens")
    })
}

  return (
    <div>
      <DeleteForeverIcon className={classes.root} onClick={handleClickOpen}>Delete Garden</DeleteForeverIcon>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Would you like to delete this garden?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
