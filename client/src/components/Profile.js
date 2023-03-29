import axios from "axios";
// import { Demo } from "./Marketplace";
import "../styles/Profile.css"
import MarketplaceJSON from "../contracts/Marketplace.json"
import { useEffect, useState } from "react";
import React from 'react'
import ProfileNFTTile from "./ProfileNFTTile";
const ethers = require("ethers");


const Profile = ({ account }, props) => {

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

  const [data, updateData] = useState(sampleData);
  // const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");
  // const arr = []

  useEffect(() => {

    async function getNFTData(tokenId) {
      let sumPrice = 0;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const addr = await signer.getAddress();
      const contractAddress = "0x1dF309D94e272E8773c78700Ea7BB248e64ddA58"


      let contract = new ethers.Contract(contractAddress, MarketplaceJSON.abi, signer)

      let transaction = await contract.fetchMyNFTs()
      // console.log(transaction.length)
      const nftCount = await transaction.length

      for (let i = 0; i < nftCount; i++) {

        const tokenId = await transaction[i][0]
        // console.log(tknId.toNumber())
        // console.log(typeof (tokenId))
        // const temp = tokenId.toNumber()
        // console.log(temp)
        // arr.push(temp)
        // console.log(arr)

        const items = await Promise.all(transaction.map(async i => {
          const tokenURI = await contract.tokenURI(i.tokenId);
          // console.log(tokenURI)
          let meta = await axios.get(tokenURI);
          meta = meta.data;
          // console.log(meta.image)

          let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
          // console.log(price)
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
          }
          // sumPrice += Number(price);
          // console.log(sumPrice)
          return item;
        }))
        if (account) {
          updateData(items);
          // console.log(data[0].image)
          updateAddress(addr);
          updateTotalPrice(sumPrice.toPrecision(3));

        }
      }
    }
    address && getNFTData()

  }, [account,address])
  return (
    <div className='profile-container'>
      <div className="profile-container-title">
        <h1>Your NFTs</h1>
      </div>
      <div className="profile-tile">
        {data.map((value, index) => {
          return <ProfileNFTTile data={value} key={index} />;
        })}

      </div>
    </div>
  )
}
export default Profile
// export{demo}

