import logo from './logo.svg';
import './App.css';
import { SecretNetworkClient } from "secretjs";

async function App() {

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  while (
    !window.keplr ||
    !window.getEnigmaUtils ||
    !window.getOfflineSignerOnlyAmino
  ){
    await sleep(100);
  }
  
  const CHAIN_ID = "secret-4";
  
  await window.keplr.enable(CHAIN_ID);
  
  const keplrOfflineSigner = window.getOfflineSignerOnlyAmino(CHAIN_ID);
  const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();
  
  const secretjs = await SecretNetworkClient.create({
    grpcWebUrl: "https://grpc-web.azure-api.net",
    chainId: CHAIN_ID,
    wallet: keplrOfflineSigner,
    walletAddress: myAddress,
    encryptionUtils: window.getEnigmaUtils(CHAIN_ID),
  });
  
  // Note: Using `window.getEnigmaUtils` is optional, it will allow
  // Keplr to use the same encryption seed across sessions for the account.
  // The benefit of this is that `secretjs.query.getTx()` will be able to decrypt
  // the response across sessions.

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
