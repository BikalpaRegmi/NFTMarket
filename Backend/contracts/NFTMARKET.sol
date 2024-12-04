// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;

import  "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract NFTMARKETPLACE is ERC721URIStorage{
    address payable public marketPlaceOwner;
    uint256 listingFee = 0.001 ether;
    uint private currentToken ;
    uint private totalItemSold ;

    struct NFTListing {
        uint tokenId;
        address payable originalMinter;
        address payable owner;
        uint currentBid ;
        uint royaltiesPercentage;
        bool isListed;
    }

    mapping(uint=>NFTListing) private nft ;

    constructor() ERC721("NFTMARKETPLACE" , "NFTS"){
        marketPlaceOwner = payable(msg.sender);
    }

    modifier OnlyOwner {
        require(msg.sender == marketPlaceOwner , "U R NOT THE OWNER");
        _; 
    }

function getANft(uint _tokenId) external view returns (NFTListing memory) {
    return nft[_tokenId];
}

function _createNftListing(uint _tokenId , uint _price , uint _royalties) internal {
    require(_royalties<49 , "Royalties is too high");

  NFTListing memory nftList = NFTListing(_tokenId ,payable(msg.sender), payable(msg.sender), _price, _royalties,true);
  nft[_tokenId] = nftList;
  
}

function createToken(string memory _tokenURI , uint _price , uint _royalties) external returns(uint){
require(_price>0.002 ether , "Price must be greater than 0.002 eth");

uint newTokenId = currentToken;
_safeMint(msg.sender , newTokenId);
_setTokenURI(newTokenId , _tokenURI);

_createNftListing(newTokenId , _price , _royalties);
currentToken++;

return newTokenId;
}

function buyNft(uint _tokenId) external payable{
    NFTListing storage sellNft = nft[_tokenId];
    require(msg.value == sellNft.currentBid ,"u must pay the exact price");

    _transfer(sellNft.owner,msg.sender,_tokenId);

   marketPlaceOwner.transfer(listingFee);

   uint royalTiesFee = (sellNft.royaltiesPercentage * sellNft.currentBid)/100 ;
   sellNft.originalMinter.transfer(royalTiesFee);

   sellNft.owner.transfer(sellNft.currentBid-listingFee-royalTiesFee);

   sellNft.owner = payable(msg.sender);
   sellNft.isListed=false;
    totalItemSold++;
}

function reListNft(uint _nftTokenId , uint _newPrice) external {
    NFTListing storage nftToSale = nft[_nftTokenId];

    require(nftToSale.owner == msg.sender , "U cant resale others nft");
require(_newPrice >= 0.002 ether , "Price must be greater than 0.002 ether");

nftToSale.currentBid = _newPrice;
nftToSale.isListed=true;
} 

function getAllListedNfts() external view returns (NFTListing[] memory){
    uint listedCount ;

    for(uint i=0 ; i<currentToken ;i++){
     if(nft[i].isListed==true){
        listedCount++;
     }
    }

    NFTListing[] memory nfts = new NFTListing[](listedCount);
 uint index ;

    for(uint i=0 ; i<listedCount ;i++){
        if(nft[i].isListed==true){
            nfts[index]=nft[i];
            index++;
        }
    }
    return nfts;
}

function getMyNfts() external view returns (NFTListing[] memory) {
    uint myNftsCount;

    for (uint i = 0; i < currentToken; i++) {
        if (nft[i].owner == msg.sender) {
            myNftsCount++;
        }
    }

    require(myNftsCount > 0, "NO NFT owned");

    NFTListing[] memory myNfts = new NFTListing[](myNftsCount);
    uint index = 0;

    for (uint i = 0; i < currentToken; i++) {
        if (nft[i].owner == msg.sender) {
            myNfts[index] = nft[i];
            index++; 
        }
    }

    return myNfts;
}


}