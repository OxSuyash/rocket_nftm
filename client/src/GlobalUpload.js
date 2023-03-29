import React from 'react'
// require('dotenv').config();
// const axios = require('axios');
import axios from "axios"
const FormData = require('form-data');

const GlobalUpload = () => {
  return (
    <div>
      Nothing to show here

    </div>
  )
}

const uploadJSONToIPFS = async (JSONBody) => {
  const key = "3694d2dd289d94b18bbc";
  const secret = "1fe7b6716dbafa6488c451ef24d353d10a32a6b0cb630b34492964c9bdca1e48";
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      }
    })
    .then(function (response) {
      return {
        success: true,
        pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
      };
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }

    });
};

const uploadFileToIPFS = async (file) => {
  const key = "3694d2dd289d94b18bbc";
  const secret = "1fe7b6716dbafa6488c451ef24d353d10a32a6b0cb630b34492964c9bdca1e48";
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  //making axios POST request to Pinata ⬇️

  let data = new FormData();
  data.append('file', file);

  const metadata = JSON.stringify({
    name: 'myLatestTest',
    keyvalues: {
      exampleKey: 'exampleValue'
    }
  });
  data.append('pinataMetadata', metadata);

  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: 'FRA1',
          desiredReplicationCount: 1
        },
        {
          id: 'NYC1',
          desiredReplicationCount: 2
        }
      ]
    }
  });
  data.append('pinataOptions', pinataOptions);

  return await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      }
    })
    .then(function (response) {
      // console.log("image uploaded", response.data.IpfsHash)
      return {
        success: true,
        pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
      };
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }

    });
};


export default GlobalUpload
export { uploadFileToIPFS, uploadJSONToIPFS }
