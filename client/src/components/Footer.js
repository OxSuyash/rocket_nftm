import React from 'react'
import "../styles/Footer.css"

const Footer = () => {
  return (
    <>
    <div className='footer-container'>
      <div className="about-project">
            <p>Rocket NFTs is a marketplace dedicated specially for rocket arts. You can list your NFT arts on the marketplace. If you want to buy NFT arts from the marketplace then you can puchase it by paying its list price. User have to pay a minimal fee for listing their NFT. </p>
      </div>
      <div className="about-dev">
            <p>About the <em>Developer</em></p>
            <div className="buttons">
                <a href="https://www.linkedin.com/in/oxsuyash/" target="_blank" rel="noreferrer"><button>LinkedIn</button></a>
                <a href="https://twitter.com/OxSuyash" target="_blank" rel="noreferrer"><button>Twitter</button></a>
                <a href="https://github.com/OxSuyash" target="_blank" rel="noreferrer"><button>Github</button></a>
            </div>
      </div>
      
    </div>
    <hr />
    <div className="copyright">
    <p>copyrights &copy; 2023 Rocket NFTs</p>
  </div>
  </>
  )
}

export default Footer
