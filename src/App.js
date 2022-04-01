import logo from './logo.svg';
import './App.css';
import { SecretNetworkClient } from "secretjs";
import {useState} from 'react';

function App() {


  let [secret, setSecret] = useState({})

  let test = async() => {
    const CHAIN_ID = "pulsar-2";

    await window.keplr.experimentalSuggestChain({
      chainId: CHAIN_ID,
      chainName: "Local Secret Chain",
      rpc: "https://rpc.pulsar.griptapejs.com",
      rest: "http://testnet.securesecrets.org:1317",
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
    
    const secretjs = await SecretNetworkClient.create({
      grpcWebUrl: "http://rpc.pulsar.griptapejs.com:9091",
      chainId: CHAIN_ID,
      wallet: keplrOfflineSigner,
      walletAddress: myAddress,
      encryptionUtils: window.getEnigmaUtils(CHAIN_ID),
    });
    console.log(secretjs.address)
    setSecret(secretjs)

  }

  
  // Note: Using `window.getEnigmaUtils` is optional, it will allow
  // Keplr to use the same encryption seed across sessions for the account.
  // The benefit of this is that `secretjs.query.getTx()` will be able to decrypt
  // the response across sessions.

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => {test()}}> 
          test
        </button>
        <p>
          {secret.address}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
