import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "../styles/Navbar.css"

const Navbar = ({ connectWallet, account }) => {
  // const [connectText, setConnectText] = useState("Connect Wallet")
  // if(account){
  //   setConnectText("")
  // }
  // console.log(account)

  return (
    <div className='nav-container'>
      <div className="brand">
        <Link to={"/"}><p>Rocket NFTs</p></Link>
      </div>
      <div className="menus">
        <div className="nav-item">
          <Link to={"/"} ><p>Home</p></Link>

        </div>
        <div className="nav-item">
          <Link to={"/marketplace"} ><p>Marketplace</p></Link>


        </div>
        <div className="nav-item">
          <Link to={"/profile/"} ><p>Your NFTs</p></Link>

        </div>
        <div className="nav-item">
          <Link to={"/upload"} ><p>Rocket Launcher</p></Link>

        </div>

        {/* <Link to={"/gupload"} ><button>global upload</button></Link> */}
        <Link to={"#"}><button onClick={connectWallet}>Connect Wallet:{account}</button></Link>

      </div>

    </div>
  )
}

export default Navbar
