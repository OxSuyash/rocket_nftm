import React from 'react'
import { useParams } from 'react-router-dom';
import MarketplaceJSON from "../contracts/Marketplace.json";
import axios from "axios";
import { useState } from "react";
import {ethers} from "ethers"
import "../styles/NFTPage.css"


const NFTPage = (props) => {
    
    const params = useParams();
    const {tokenId} = params;
    // const ur = String(window.location.href);
    // const op = ur.split("").reverse()[0]
    // console.log(op)
    console.log(tokenId)
const [data, updateData] = useState({});
const [dataFetched, updateDataFetched] = useState(false);
const [message, updateMessage] = useState("");
const [currAddress, updateCurrAddress] = useState("0x");

  async function getNFTData(tokenId) {
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    console.log(addr)
    const contractAddress = "0x1dF309D94e272E8773c78700Ea7BB248e64ddA58";
    let contract = new ethers.Contract(contractAddress, MarketplaceJSON.abi, signer)
    
    const tokenURI = await contract.tokenURI(tokenId);
    console.log("object")
    const listedToken = await contract.getListedForTokenId(tokenId);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    // console.log(listedToken);

    let item = {
        price: meta.price,
        tokenId: tokenId,
        seller: listedToken.seller,
        owner: listedToken.owner,
        image: meta.image,
        name: meta.name,
        description: meta.description,
    }
    console.log(data.image)
    updateData(item);
    updateDataFetched(true);
    updateCurrAddress(addr);
}

  async function buyNFT(tokenId) {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x1dF309D94e272E8773c78700Ea7BB248e64ddA58"

        let contract = new ethers.Contract(contractAddress, MarketplaceJSON.abi, signer);
        const salePrice = ethers.utils.parseUnits(data.price, 'ether')
        updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")
        let transaction = await contract.buyNFT(tokenId, {value:salePrice});
        await transaction.wait();

        alert('You successfully bought the NFT!');
        updateMessage("");
    }
    catch(e) {
        alert("Upload Error"+e)
    }
}
    if(!dataFetched)
        getNFTData(tokenId);

  return (
    <div className='NFTPage-main-container'>
            <h1>TokenId: #{data.tokenId}</h1>
            <div className="NFTPage-container">
                
                <img src={data.image} alt="" className="w-2/5" />
                <div className="details-container">
                    <div className='nft-details'>
                        <p>Name: {data.name}</p>
                    </div>
                    <div className='nft-details'>
                        <p>Description: {data.description}</p>
                    </div>
                    <div className='nft-details'>
                        <p>Price: <span className="">{data.price + " ETH"}</span></p>
                    </div>
                    <div className='nft-details'>
                        <p>Owner: <span className="text-sm">{data.owner}</span></p>
                    </div>
                    <div className='nft-details'>
                        <p>Seller: <span className="text-sm">{data.seller}</span></p>
                    </div>
                    <div className='nft-details'>
                    {  currAddress !== data.seller ?
                        <button onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
                        : <div className="owner-status"><p>You own this NFT</p></div>
                    }
                    
                    <div className="text-green text-center mt-3">{message}</div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default NFTPage
