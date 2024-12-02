// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;

import  "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTMARKETPLACE is ERC721URIStorage{
    address payable public marketPlaceOwner;
    uint256 listingFee = 0.001 ether;
    uint private currentToken ;
    uint private totalItemSold ;

    struct NFTListing {
        uint tokenId;
        address payable owner;
        address payable seller;
        uint startPrice;
        uint currentBid ;
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

function _createNftListing(uint _tokenId , uint _price) internal {

}

function createToken(string memory _tokenURI , uint _price) external returns(uint){
require(_price>0 , "Price cant be zero");

uint newTokenId = currentToken;
_safeMint(msg.sender , newTokenId);
_setTokenURI(newTokenId , _tokenURI);

_createNftListing(newTokenId , _price);

return newTokenId;
}

}