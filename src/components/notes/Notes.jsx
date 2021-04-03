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
//Note list component
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'




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


const useStyles = makeStyles((theme) => ({
  appBar: {
    background:"#EE8051",
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  noteIcon: {
      color: "#8C4E6D",
      margin: 10
  },
  removeNote:{
    color:"#8C4E6D",
    margin: 5
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const SeeNotesDialog = ({garden, notes}) =>{
  const {deleteNote} = useContext(NoteContext)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeNote = (id) => {
    deleteNote(id)
  }

  return (
    <div>
      <NoteIcon className={classes.noteIcon} onClick={handleClickOpen}></NoteIcon>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {garden.name}  Notes
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {notes?.map(note =>
        <List key={note.id}>
            <ListItem><RemoveCircleIcon onClick={removeNote.bind(removeNote, note.id)} className={classes.removeNote} /> <ListItemText primary={note.note}/>{new Date(note.date).toLocaleDateString()}</ListItem>
          <Divider />
        </List>)} 
      </Dialog>
    </div>
  );
}
