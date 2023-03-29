//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Marketplace is ERC721URIStorage{
    address payable owner;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;
    Counters.Counter private _itemsSold;

    uint platformFee = 0.0001 ether;

    constructor() ERC721("Rocket", "RKT") {
        owner = payable(msg.sender);
    }

    struct liveToken{
        uint tokenId;
        address payable owner;
        address payable seller;
        uint price;
        bool isListed;
        bool isApproved;
    }

    mapping(uint => liveToken) private tokenLog;


    //Helper Functions

    function updatePlatformFee(uint _platformFee) public {
        require(msg.sender==owner,"Only owner can update the platform fee");
        platformFee=_platformFee;
    }

    function getPlatformFee() public view returns(uint) {
        return platformFee;
    }

    function getListedForTokenId(uint tokenId) public view returns(liveToken memory) {
        return tokenLog[tokenId];
    }

    function getCurrentId() public view returns(uint) {
        return _tokenId.current();
    }

    //Main Functions

    function createToken(string memory tokenURI, uint price) public payable returns(uint) {
        require(msg.value == platformFee,"Insufficient funds in order to list your NFT");
        require(price>0,"Enter valid Price");

        _tokenId.increment();
        uint currentTokenId = _tokenId.current();
        _safeMint(msg.sender, currentTokenId);

        _setTokenURI(currentTokenId, tokenURI);

        listToken(currentTokenId, price);

        return currentTokenId;
    }

    function listToken(uint tokenId, uint price) public {
        tokenLog[tokenId] = liveToken(
            tokenId, 
            payable (address(this)),
            payable(msg.sender),
            price,
            true,
            false
        );
        _transfer(msg.sender, address(this), tokenId);
        
    }

    function fetchAllNFTs() public view returns(liveToken[] memory) {
        uint nftCount = _tokenId.current();
        liveToken[] memory tokens = new liveToken[](nftCount);

        uint index=0;
        for (uint i =0; i<nftCount;i++) {
            uint id = i+1;
            liveToken storage item = tokenLog[id];
            tokens[index]=item;
            index+=1;
        }
        return tokens;
    }

    function fetchMyNFTs() public view returns(liveToken[] memory) {
        uint totalNFTs= _tokenId.current();
        uint totalNFTsOfUser=0;
        uint index=0;
        uint id=0;
        for(uint i=0; i<totalNFTs;i++){
            if(tokenLog[i+1].owner == msg.sender || tokenLog[i+1].seller == msg.sender) {
                totalNFTsOfUser+=1;
            }
        }

        liveToken[] memory NFTs = new liveToken[](totalNFTsOfUser);
        for(uint i=0; i<totalNFTs; i++) {
            if(tokenLog[i+1].owner==msg.sender || tokenLog[i+1].seller == msg.sender) {
                id=i+1;
                liveToken storage currentNFT = tokenLog[id];    
                NFTs[index] = currentNFT;
                index+=1;
            }
        }
        return NFTs;
    }

    function buyNFT(uint tokenId) public payable {
        uint _price = tokenLog[tokenId].price;
        require(msg.value == _price, "Please send enough funds to purchase the NFT");
        require(tokenLog[tokenId].isListed == true,"Owner has not listed this NFT");

        address seller = tokenLog[tokenId].seller;

        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);

        approve(address(this), tokenId);
        tokenLog[tokenId].isApproved = true;

        payable(owner).transfer(platformFee);

        payable(seller).transfer(msg.value);

        tokenLog[tokenId].owner = payable(msg.sender);

        tokenLog[tokenId].seller = payable(msg.sender);

        tokenLog[tokenId].isListed = false;
        tokenLog[tokenId].isApproved = false;
    }

    // function approveSale(uint tokenId) public {
    //     require(tokenLog[tokenId].owner == msg.sender, "Only the owner can approve this sale.");
    //     approve(address(this), tokenId);
    //     tokenLog[tokenId].isApproved = true;
    // }

    function unListNFT(uint tokenId) public{
        require(tokenLog[tokenId].owner == msg.sender,"Only the owner of NFT can unlist it");
        require(tokenLog[tokenId].isListed == true,"This NFT is not yet listed on the marketplace");
        tokenLog[tokenId].isListed = false;
    }
}

//local network deploy:  0x5FbDB2315678afecb367f032d93F642f64180aa3