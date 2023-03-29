import React from 'react'
import {Link} from "react-router-dom"
import "../styles/NFTTile.css"

const NFTTile = (data) => {
    const newTo = {
        pathname:"/nftPage/"+data.data.tokenId
    }
   
  return (
    <>
     <Link to={newTo}>
        <div className="main">
            <img src={data.data.image} alt=""  />
            <div className= "detail">
                <div className="detail-main">
                <h4 className="text-xl">#{data.data.tokenId}</h4>
                <h4 className="text-xl">{data.data.name}</h4>
                </div>
                <p className="display-inline">
                    Price: &nbsp;{data.data.price}&nbsp;ETH
                </p>
            </div>  
        </div>
        </Link>
    </>
  )
}

export default NFTTile
