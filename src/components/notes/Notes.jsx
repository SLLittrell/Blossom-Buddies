import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import { TextareaAutosize } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import NoteIcon from '@material-ui/icons/Note';
import { makeStyles } from '@material-ui/core/styles';
import {NoteContext} from './NoteProvider'
import { useParams } from 'react-router';



const removeStyle =makeStyles((theme) => ({
    root: {
      color: "#8C4E6D",
      margin: 10
    },
    save:{
        background:"#6d8031",
        color:"#cdc1a9"
    }
  }))

  

export const NoteDialog =()=> {
  const [open, setOpen] = React.useState(false);
  const {addNote} = useContext(NoteContext)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const glasses = removeStyle()

  const handleClose = () => {
    setOpen(false);
  };
  const {gardenId} = useParams()

  const [note, setNote] = useState({
    note:"",
    date: Date.now(),
    gardenId: parseInt(gardenId)
})

  const inputChange = (event) => {
    const newNote = {...note}
    newNote[event.target.id] = event.target.value
    setNote(newNote)
}
  
    const saveNote = () => {
        if(note.note !== ""){ 
        addNote(note)
        .then(handleClose())
    }
    else{
        window.alert("Please enter a note or cancel")
    }
       
  }


  return (
    <div className="noteDialog">
      <NoteAddIcon className={glasses.root} onClick={handleClickOpen} label="Create a note"></NoteAddIcon>
      <NoteIcon className={glasses.root}></NoteIcon>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Garden Notes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Notes
          </DialogContentText>
          <TextareaAutosize id="note" onChange={inputChange} aria-label="minimum height" rowsMin={15} placeholder="Take Note"/>  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={glasses.save}>
            Cancel
          </Button>
          <Button onClick={saveNote}  className={glasses.save}>
            Save Note
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
