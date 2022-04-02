import { SecretNetworkClient } from "secretjs";
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { fade, makeStyles } from '@material-ui/core/styles';
// import Link from '@mui/material/Link';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@material-ui/core';
import React, { useRef } from 'react'
import AnimatedModal from "./findListingModal.component";
import BookListingModal from "./bookListing.component";
import Logo from "../assets/dbnbWhite.png"

const mockListings =[[
    {
      name: "Hi Hostel",
      description: "the best",
      address: "801 broadway",
      images: ["",""],
      price: "100"
    },
    {
      name: "Hi Hostel",
      description: "the best",
      address: "801 broadway",
      images: ["",""],
      price: "100"
    },
      {
      name: "Hi Hostel",
      description: "the best",
      address: "801 broadway",
      images: ["",""],
      price: "100"
    },
],3]

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [
        theme.breakpoints.up('sm')]: {
          display: 'block',
      },
    },
  }));



function Manage() {

    const theme = createTheme();
    const classes = useStyles();

    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="secondary">
        <Toolbar>
            <img src={Logo} width="200px" noWrap></img>
          <Typography className={classes.title} variant="h4" noWrap>
           
          </Typography>
          <Button variant="outlined"  color="inherit"><Link style={{ textDecoration: 'none', color: '#FFFF' }} to={"/"}>Back to Listings</Link></Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Dispute Management
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Decentralized Democratized Fairness
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" className="link" color="secondary">Find a Listing</Button>
              <AnimatedModal />
            </Stack>
          </Container>
        </Box>
        <div className="section section2">
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {mockListings.map((item) => (
              <Grid item key={item} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography>
                      {item.price}<br/>3 Bathroom<br/>$125/day
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <BookListingModal/>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </div>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          dBnB by Blockchain at Virginia Tech
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          All Rights Reserved.
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
    );
}

export default Manage;