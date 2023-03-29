import React from 'react'
import {Link} from "react-router-dom"
import "../styles/Home.css"
import rocket from "../assets/rocket.png"

const Home = () => {
 
  return (
    <div className="home-container">
      <div className="home-image">
      <img src={rocket} alt="" />
      </div>
      <div className="home-main-content">
        <h3>Own a rocket and Launch it!!!</h3>
        <p>Welcome to Rocket NFTs! Rocket NFTs is a NFT marketplace where you can mint your own rocket NFTs (or launch a rocket!) <br />
        Create your own digital collectibles and sell them...</p>
        <Link to={"/upload"}><button>Launch Now!</button></Link>

      </div>
      
    </div>
  )
}

export default Home
