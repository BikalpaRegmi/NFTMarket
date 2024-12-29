// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;

import  "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTMARKETPLACE is ERC721URIStorage{
    address payable marketPlaceOwner;
    uint private ListingFee = 0.001 ether ;
    
struct NftListing {
uint startPrice;
uint currentPrice;
uint biddingTime;
uint royaltyFee;
uint tokenId;
bool isListed;
address payable owner;
address highestBidder;
address payable minter;
string metaDataUrl;
}

mapping(uint=>NftListing) private nft;
uint private nftCount ;

constructor() ERC721("NFTMARKETPLACE" , "NFTS") {
marketPlaceOwner = payable(msg.sender);
}

function createNftListing(uint _strtPrice , uint _royalty , string memory _tokenURI) external payable{
require(_royalty<=50 , 'royalty percent cant be more than fifty');
require(_strtPrice >= 0.002 ether , "Start price must be atleast 0.002 eth");

_safeMint(msg.sender , nftCount);
_setTokenURI(nftCount, _tokenURI);

NftListing memory setNft = NftListing(_strtPrice ,_strtPrice, block.timestamp , _royalty, nftCount, true , payable(msg.sender) ,address(0), payable(msg.sender),_tokenURI );
nft[nftCount] = setNft;

marketPlaceOwner.transfer(msg.value);

nftCount++;
}

function getANft(uint _tokenId) external view returns(NftListing memory){
   return nft[_tokenId] ;
}

function participateBidding(uint _tokenId) external payable{
NftListing memory selectedNft = nft[_tokenId];
require(selectedNft.currentPrice <= msg.value , "U Must Pay Greater Than Previous Bid");
require(selectedNft.isListed , "The selected nft is not listed");

if(selectedNft.highestBidder != address(0)){
    payable(selectedNft.highestBidder).transfer(selectedNft.currentPrice);
}

selectedNft.currentPrice = msg.value;
selectedNft.highestBidder = msg.sender;

nft[_tokenId] = selectedNft;
}

function finalizeBidding(uint _tokenId) external {
    NftListing memory getNft = nft[_tokenId];
    require(getNft.isListed == true, "This NFT is not listed");
    // Uncomment and adjust bidding time if needed
    // require(block.timestamp >= getNft.biddingTime + 604800, "Bidding duration not met");

    if (getNft.highestBidder == address(0)) {
        getNft.isListed = false;
        getNft.owner = payable(msg.sender);
    } else {
        uint royaltyFee = (getNft.royaltyFee * getNft.currentPrice) / 100;
        uint remainingAmount = getNft.currentPrice - royaltyFee;

        getNft.minter.transfer(royaltyFee);

        getNft.owner.transfer(remainingAmount);

        getNft.owner = payable(getNft.highestBidder);
        getNft.isListed = false;
    _transfer(ownerOf(_tokenId), getNft.highestBidder, _tokenId);
        getNft.highestBidder = address(0);
    }

    nft[_tokenId] = getNft;

}


function reList(uint _tokenId) external payable{
NftListing memory selectedNft = nft[_tokenId];

require(selectedNft.isListed == false , "The selected nft is already listed");
require(msg.value == 0.001 ether , "The listing fee is 0.001 ether");
require(selectedNft.owner == msg.sender , "only owner can relist the nft");

selectedNft.isListed = true;
selectedNft.currentPrice = selectedNft.currentPrice;

marketPlaceOwner.transfer(0.001 ether);

nft[_tokenId] = selectedNft;
}

function getAllListedNfts() external view returns (NftListing[] memory){
NftListing[] memory allNft = new NftListing[](nftCount);

for(uint i=0 ; i<nftCount ; ++i){
    allNft[i] = nft[i];
}
return allNft;
}

}
