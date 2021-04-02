import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import { TextareaAutosize } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NotesIcon from '@material-ui/icons/Notes';
import { makeStyles } from '@material-ui/core/styles';
import {NoteContext} from './NoteProvider'

const removeStyle =makeStyles((theme) => ({
    root: {
      color: "#8C4E6D",
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

  const [note, setNote] = useState({
    note:"",
    date: "",
})

  const inputChange = (event) => {
    const newNote = {...note}
    newNote[event.target.id] = event.target.value
    setNote(newNote)
}
  
    const saveNote = () => {
        addNote(note)
  }

  return (
    <div>
      <NotesIcon className="notes" onClick={handleClickOpen}></NotesIcon>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Plant Notes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Notes
          </DialogContentText>
          <TextareaAutosize id="note" onChange={inputChange} aria-label="minimum height" rowsMin={15} placeholder="Take Note"/>  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveNote} color="primary">
            Save Note
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
