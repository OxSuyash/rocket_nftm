import React from 'react'
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from '../GlobalUpload'
import abi from "../contracts/Marketplace.json"
import {ethers} from "ethers"
import "../styles/FileUpload.css"
import rocket2 from "../assets/rocket2.png"

const FileUpload = () => {
  const [text, setText] = useState("")
  const [fileURL, setFileURL] = useState(null);
  const [message, updateMessage] = useState('');
  // const [accountText, setAccount] = useState(null)

  async function onChangeFile(e) {
      var file = e.target.files[0];
      setText("Please wait...Your file is being uploaded")

      try{
          const response = await uploadFileToIPFS(file);
          if(response.success === true) {
            // setFileUploadStatus("Please wait... File is being uploaded")
              // console.log("Uploaded image to pinata: ", response.pinataURL)
              alert("Your rocket art is successfully uploaded to IPFS, now list your NFT!")
              setFileURL(response.pinataURL)
              // setFileURL("Yesssss")
              setText("")
          }
      }catch(e) {
          console.log("Error during file upload: ", e)
      }
  } 

  async function uploadMetadataToIPFS(){
      const name = document.querySelector("#name").value;
      const description = document.querySelector("#desc").value;
      const price = document.querySelector("#price").value;

      if(!name || !description || !price) {
        return;
      }
      const  nftJSON = {
          name, description, price, image: fileURL
      };
      try{
          const response = await uploadJSONToIPFS(nftJSON);
          if(response.success === true) {
              // console.log("Uploaded JSON to pinata",response)
              return response.pinataURL;
          }

      }catch(e) {
          console.log("Error uploading JSON metadata",e)
      }
  }
  async function listNFT(e) {
      e.preventDefault();

      const contractAddress = "0x1dF309D94e272E8773c78700Ea7BB248e64ddA58";
    const contractABI = abi.abi;
    // try {
      const { ethereum } = window;
      if (ethereum) {
        // const account = await ethereum.request({ method: "eth_requestAccounts", })
        // setAccount(account)
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      // console.log(contract)
      try{
          const metadatURL = await uploadMetadataToIPFS();
          // console.log(metadatURL)
          updateMessage("Please wait (5 min) ... uploading your NFT...");

          const _price = document.querySelector("#price").value;
          // console.log(_price)
          const price = ethers.utils.parseUnits(_price, "ether");
          // console.log(price)
          // console.log(contract)
          let  listingPrice = await contract.getPlatformFee();

          listingPrice = listingPrice.toString();
          // console.log(listingPrice)

          let transaction = await contract.createToken(metadatURL, price, {value: listingPrice});
          await transaction.wait();
          alert("Successfully listed your Rocket NFT...(It may take few minutes to reflect the changes on marketplace.");

          updateMessage("");
          
          window.location.replace("/")
      }catch(e){
          alert("Upload error:"+e);
          updateMessage("")
      }

  }
  return (
    <div className='fileUpload-container'>
      <div className="fileUpload-container-image">
        <img src={rocket2} alt="" />

      </div>
      <form className="form">
        <h1>List your Rocket NFT!</h1>
        <div className="form-item" id='form-item1'>
          <label htmlFor="name">Name:&nbsp;</label>
          <input type="text" className='name' id='name' placeholder='Enter name of your file' required/>
        </div>

        
        <div className="form-item">
          <label htmlFor="name">Description:&nbsp;</label>
          <input className="desc" cols="40" rows="5" id="desc" type="text" placeholder="Description" required></input>
        </div>

        <div className="form-item">
          <label htmlFor="price">Price:&nbsp;</label>
          <input type="text" className='price' id='price' placeholder='Enter price of your NFT' required/>
        </div>

        <div className="form-item">
          <label className="file" htmlFor="file">Upload Image&nbsp;</label>
          <input type={"file"} onChange={onChangeFile} required ></input>
          <p>{text}</p>
        </div>

        <div className="form-item">
          <div className="btn"><p>{message}</p></div>
          <button onClick={listNFT} className="" disabled={!fileURL}>
            List NFT
          </button>
        </div>
      </form>
    </div>
  )
}

export default FileUpload
