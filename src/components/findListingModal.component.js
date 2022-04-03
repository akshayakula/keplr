import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


const DBnB = "secret13ms9s4jfkzzrw780vwjaumchxu7vg4rpx9uspr";
const DBnBCH = "3408653022b1302f51ae7e70fdbaab71d3aab1b20c331010016dcdc604d7f909";

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
export default function AnimatedModal(children) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [images, setImages] = React.useState("");
    const [price, setPrice] = React.useState("");



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
                            <Stack direction="row" spacing={3}>
                                <TextField id="filled-basic" label="Name" variant="filled" value={name} onChange={(val) => {console.log(val.target.value); setName(val.target.value)}}/>
                                <TextField id="filled-basic" label="Description" variant="filled" value={description} onChange={(val) => {setDescription(val.target.value)}} />
                                <TextField id="filled-basic" label="Address" variant="filled" value={address} onChange={(val) => {setAddress(val.target.value)}} />
                                <TextField id="filled-basic" label="Images" variant="filled"  value={images} onChange={(val) => {setImages(val.target.value)}}/>
                                <TextField id="filled-basic" label="Price" variant="filled" value={price} onChange={(val) => {setPrice(val.target.value)}}/>
                            </Stack>
                            <br></br>
                            <Button  variant="contained" color="secondary" onClick={async () => {
                                // console.log(children)
                                const v = name;
                                const v1 = description;
                                const v2 = address;
                                const v3 = price;

                                await children.props.tx.compute.executeContract({
                                    sender: children.props.address,
                                    contract: DBnB,
                                    codeHash: DBnBCH,
                                    msg: { add_listing: {
                                            name: v,
                                            description: v1,
                                            address: v2,
                                            images: [],
                                            price: v3
                                        }
                                    }
                                }, {
                                    gasLimit: 75000
                                });
                            }}>Submit</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
