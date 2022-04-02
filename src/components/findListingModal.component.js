import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
const useStyles = makeStyles(theme => ({
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
export default function AnimatedModal() {
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
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Make a Listing
            </Button>
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
                    <div className={classes.paper}>
                            <h2>Make a Listing</h2>
                            <form action="/action_page.php">
                                <label for="fname">Listing Name:</label>
                                <input type="text" id="fname" name="fname"/><br/>
                                <label for="lname">Description:</label>
                                <input type="text" id="lname" name="lname"/><br/>
                                <label for="lname">Address:</label>
                                <input type="text" id="lname" name="lname"/><br/>
                                <label for="lname">Image Link:</label>
                                <input type="text" id="lname" name="lname"/><br/>
                                <label for="lname">Price / Night:</label>
                                <input type="text" id="lname" name="lname"/><br/>
                                <input type="submit" value="Submit"/>
                            </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
