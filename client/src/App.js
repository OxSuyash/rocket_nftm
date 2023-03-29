import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import { ethers } from "ethers"
import abi from "./contracts/Marketplace.json"
import FileUpload from "./components/FileUpload";
import Home from "./components/Home";
import Marketplace from "./components/Marketplace";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import NFTPage from "./components/NFTPage";
import Footer from "./components/Footer";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [account, setAccount] = useState(null)
  const connectWallet = async () => {
    const contractAddress = "0x1dF309D94e272E8773c78700Ea7BB248e64ddA58";
    const contractABI = abi.abi;
    try {
      const { ethereum } = window;

      if (ethereum) {
        const account = await ethereum.request({ method: "eth_requestAccounts", })
        setAccount(account)

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        })
        window.ethereum.on("accountChanged", () => {
          window.location.reload();
        })

        const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      // console.log(contract)
      setState({ provider, signer, contract })


      }else{
        alert("Please install metamask")
      }
      // const price = await contract.getPlatformFee()
      // console.log(price)
    } catch (error) {
      // console.log(error);
      alert(error)
    }
  }
  
  // console.log(state)
  return (
    <Router>
      <Navbar connectWallet={connectWallet} account={account}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace account={account}/>} />
        <Route path="/profile/" element={<Profile account={account}/>} />
        {/* <Route path="/profile" element={<Profile/>} /> */}
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/nftpage/:tokenId" element={<NFTPage />} />
        {/* <Route path="/gupload" element={<GlobalUpload />} /> */}
      </Routes>
      <Footer/>

    </Router>
  );
}

export default App;
