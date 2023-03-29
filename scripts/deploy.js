const hre = require("hardhat");


async function main() {


    const marketplace = await hre.ethers.getContractFactory("Marketplace");


    const contract = await marketplace.deploy();   //instance of contract


    await contract.deployed();   //contract deployed on hardhat network


    console.log("Address of contract", contract.address);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
//0xb9EEce220B2B168Bdc6aDcC8ae900Fc9A835E7Af     goerli
//0x5FbDB2315678afecb367f032d93F642f64180aa3     local

//0x086d9a383807154C9e8fca0f42791c4cA716dFb1 test goerli
//0x1FA85B19624aD3647183D2311B483B5cDBDd8Ca7 test goerli 
//0x3029c0248d1F9AfBE79977B4F298C471650BFE02 test goerli 
//0x9d778848A9Cbd36dd054d80bcC9EA636a736dD5e test goerli 
//0xC837326d0209f050fFCa6B3E7B6f89508B9509c6 test goerli
//0x1dF309D94e272E8773c78700Ea7BB248e64ddA58 final 