import {SecretNetworkClient} from "secretjs";
import React, {useRef, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
// import {useHistory} from 'react';
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
import {makeStyles} from '@material-ui/core/styles';
// import Link from '@mui/material/Link';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link} from "react-router-dom";
import AnimatedModal from "./findListingModal.component";
import BookListingModal from "./bookListing.component";
import Logo from "../assets/dbnbWhite.png"
// import '../assets/splash-screen.css';


const DBnB = "secret13ms9s4jfkzzrw780vwjaumchxu7vg4rpx9uspr";
const DBnBCH = "3408653022b1302f51ae7e70fdbaab71d3aab1b20c331010016dcdc604d7f909";

console.log(DBnB, DBnBCH)

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


function Home() {
  let [secret, setSecret] = useState({});
  let [listings, setListings] = useState([]);
  let [confirms, setConfirms] = useState([])

  let connect = async() => {
    const CHAIN_ID = "secretdev-1";

    await window.keplr.experimentalSuggestChain({
      chainId: CHAIN_ID,
      chainName: "Secret Test Net",
      rpc: "http://localhost:26657",
      rest: "http://localhost:1317",
      bip44: {
        coinType: 529,
      },
      coinType: 529,
      stakeCurrency: {
        coinDenom: "SCRT",
        coinMinimalDenom: "uscrt",
        coinDecimals: 6,
      },
      bech32Config: {
        bech32PrefixAccAddr: "secret",
        bech32PrefixAccPub: "secretpub",
        bech32PrefixValAddr: "secretvaloper",
        bech32PrefixValPub: "secretvaloperpub",
        bech32PrefixConsAddr: "secretvalcons",
        bech32PrefixConsPub: "secretvalconspub",
      },
      currencies: [
        {
          coinDenom: "SCRT",
          coinMinimalDenom: "uscrt",
          coinDecimals: 6,
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "SCRT",
          coinMinimalDenom: "uscrt",
          coinDecimals: 6,
        },
      ],
      gasPriceStep: {
        low: 0.1,
        average: 0.25,
        high: 0.4,
      },
      features: ["secretwasm"],
    });

    console.log("PRESED!")
    // event.preventdefault()
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    while (
      !window.keplr ||
      !window.getEnigmaUtils ||
      !window.getOfflineSignerOnlyAmino
    ){
      await sleep(100);
    }


    await window.keplr.enable(CHAIN_ID);

    const keplrOfflineSigner = window.getOfflineSignerOnlyAmino(CHAIN_ID);
    const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();
    console.log(keplrOfflineSigner)

    SecretNetworkClient.create({
      grpcWebUrl: "http://localhost:9091",
      chainId: CHAIN_ID,
      wallet: keplrOfflineSigner,
      walletAddress: myAddress,
    }).then(sjs => {
      console.log(sjs)
      setSecret(sjs)
    })

  }

  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const theme = createTheme();

  // Note: Using `window.getEnigmaUtils` is optional, it will allow
  // Keplr to use the same encryption seed across sessions for the account.
  // The benefit of this is that `secretjs.query.getTx()` will be able to decrypt
  // the response across sessions.
  const aboutSection = useRef(null);
  const scrollDown = async () => {
    await getListings()

    window.scrollTo({
      top: aboutSection.current.offsetTop,
      behavior: 'smooth',
    });
  };
  const toDisputes= () => {
    console.log('clicked')
  }
  //add Listing
  const getListings = async () =>  {

    const res = await secret.query.compute.queryContract({
      address: DBnB,
      codeHash: DBnBCH,
      query: {get_listings: {page: 0, page_size: 50}}
    })

    let vk_response = await secret.tx.compute.executeContract({
      sender: secret.address,
      contract: DBnB,
      codeHash: DBnBCH,
      msg: {
        create_viewing_key: {
          entropy: "FcGrrhubIpDn2fVYAqmQmKYl+Fj2wpPoWSMGc/mspHI="
        }
      }
    }, {
      gasLimit: 50000
    })
    console.log("p", vk_response)
    const decoder = new TextDecoder();
    const vk1 = JSON.parse(decoder.decode(vk_response.data[0].buffer))

    const test = {
      get_confirmations: {
        page: 0,
        page_size: 50,
        address: secret.address,
        vk: vk1.create_viewing_key.key
      }
    }
    console.log(test);
    const confirmations = await secret.query.compute.queryContract({
      address: DBnB,
      codeHash: DBnBCH,
      query: test
    })
    console.log(res);
    setListings(res[0]);
    console.log(confirmations)
    setConfirms(confirmations.Ok)

  }
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="secondary">
        <Toolbar>
            <img src={Logo} width="200px" noWrap></img>
          <Typography className={classes.title} variant="h4" noWrap>

          </Typography>

          {
            secret.address ?
              <div>
                <Stack direction="row" spacing={2}>
                <Typography className={classes.title} variant="h6">
                  {secret.address}
                </Typography>
                <Button variant="outlined"  color="inherit"><Link style={{ textDecoration: 'none', color: '#FFFF'}} to={"./disputes"}>Manage Disputes</Link></Button>
                </Stack>
              </div>
            :
            <Button variant="outlined" onClick={()=>{connect()}}  color="inherit">Connect</Button>
          }
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
              Decentralized Airbnb
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              No Fees. No Hassles. Safe and Secure.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" className="link" onClick={scrollDown} color="secondary">Find a Listing</Button>
              <AnimatedModal props={secret} />
            </Stack>
          </Container>
        </Box>
        <div className="section section2" ref={aboutSection}>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {listings.map((item, i) => (
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
                      {item.price}$<br/>{item.description}
                    </Typography>

                    {
                      confirms.map(e => {
                        if(e.id === item.id){
                          console.log("pppppppp")
                          return <Typography gutterBottom variant="h5" component="h2">
                                      Date: {e.start} to {e.end}
                                  </Typography>
                        }
                      })
                    }

                  </CardContent>
                  <CardActions>
                    <BookListingModal props={[item, confirms, setConfirms, secret]}/>
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
export default Home;
