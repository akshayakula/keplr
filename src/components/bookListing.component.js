import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DatePicker from "date-fns/format";
import ReactDOM from "react-dom";
import TextField from '@mui/material/TextField';
import DateFnsAdapter from '@mui/lab/AdapterDateFns';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';

// import MyDatePicker from "./MyDatePicker";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';


// function MyDatePicker() {
//     ;
//     const handleChange = date => setDate(date);
  
//     return ;
// }


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
  

export default function BookListingModal({children}) {
    const [date, setDate] = useState(new Date());
    const classes = useStyles();
    const [endDate, setEndDate] = useState(new Date())
    const [value, setValue] = React.useState([null, null]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        console.log('opens')
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const theme = createTheme();

    return (
        <div>
            <ThemeProvider theme={theme}>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
                Book It!
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
                            <h2>Book This Listing</h2>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDateRangePicker
                                displayStaticWrapperAs="desktop"
                                value={value}
                                onChange={(newValue) => {
                                setValue(newValue);
                                }}
                                renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} />
                                </React.Fragment>
                                )}
                            />
                            </LocalizationProvider>
                            <br></br>
                                {/* <TextField id="filled-basic" label="" variant="filled" /> */}
                                {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
                                <Button  variant="contained" color="secondary" onClick={() => {console.log(value)}}>Submit</Button>
                    </div>
                </Fade>
            </Modal>
            </ThemeProvider>
        </div>
    );
}
