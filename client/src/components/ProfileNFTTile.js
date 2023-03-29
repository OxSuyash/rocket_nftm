import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/ProfileNFTTile.css"

const ProfileNFTTile = (data) => {
    const newTo = {
        pathname:"/nftPage/"+data.data.tokenId
    }

  return (
    <Link to={newTo}>
        <div className="profile-main">
            <img src={data.data.image} alt=""  />
            <div className= "profile-detail">
                <div className="profile-detail-main">
                <h4 className="detail-text">#{data.data.tokenId}</h4>
                <h4 className="detail-text">{data.data.name}</h4>
                </div>
                
                <p className="detail-price">
                    Price: &nbsp;{data.data.price}&nbsp;ETH
                </p>
            </div>  
        </div>
        </Link>
  )
}

export default ProfileNFTTile
