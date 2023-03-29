import React, { useEffect } from 'react'
import { useState } from "react"
import axios from "axios"
import { ethers } from "ethers"
import NFTTile from "./NFTTile"
import MarketplaceJson from "../contracts/Marketplace.json"
import "../styles/Marketplace.css"


const Marketplace = ({ account }) => {
  const sampleData = [
    {
      "name": "1Rocket",
      "description": "Rocket's first NFT",
      "website": "rocketnft",
      "image": "https://gateway.pinata.cloud/ipfs/QmSpxktZsBbKYVfdv5zUpp2NeDE2QNbNMin7vVJhZgue1P",
      "price": "0.0",
      "currentlySelling": "True",
      "address": "0xe81Bf5A757CB4f7F82a2F23b9bE45c33c5b13",
    },
    {
      "name": "2Rocket",
      "description": "Rocket's first NFT",
      "website": "rocketnft",
      "image": "https://gateway.pinata.cloud/ipfs/QmSpxktZsBbKYVfdv5zUpp2NeDE2QNbNMin7vVJhZgue1P",
      "price": "0.0",
      "currentlySelling": "True",
      "address": "0xe81Bf5A757CB4f7F82a2F23b9bE45c33c5b13",
    },
    {
      "name": "3Rocket",
      "description": "Rocket's first NFT",
      "website": "rocketnft",
      "image": "https://gateway.pinata.cloud/ipfs/QmSpxktZsBbKYVfdv5zUpp2NeDE2QNbNMin7vVJhZgue1P",
      "price": "0.0",
      "currentlySelling": "True",
      "address": "0xe81Bf5A757CB4f7F82a2F23b9bE45c33c5b13",
    },
    
  ];
  const [data, setData] = useState(sampleData)
  // const [log, setLog] = useState(null)
  useEffect(() => {

    async function getAllNFTs() {
      // console.log(account)
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const log = await signer.getAddress()
      // console.log(log)

      const contractAddress = "0x1dF309D94e272E8773c78700Ea7BB248e64ddA58"
      let contract = new ethers.Contract(contractAddress, MarketplaceJson.abi, signer)

      let transaction = await contract.fetchAllNFTs()
      // console.log(transaction[0][0])

      const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);

        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        }
        // console.log(item)
        return item;
      }))

      if (account) {
        setData(items);
        // console.log(data.image)
      }
    }
    getAllNFTs();
  }, [account])
  return (
    <div className='market-container'>
      <div className="market-container-title">
        <h1>NFT Marketplace</h1>
      </div>
      <div className="tile">
        {data.map((value, index) => {
          return <NFTTile data={value} key={index}></NFTTile>;
        })}
      </div>
    </div>
  )
}
export default Marketplace
