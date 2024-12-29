import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEthereum } from "../../Contexts/contractContext";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

interface allNftType {
  name: null | string;
  desc: string | null;
  image: string | null;
  owner: string | null;
  biddingTime: number  | null; 
  startPrice: number | null;
  currentPrice: number | null | string;
  royaltyFee: number | null;
  tokenId: number | null;
  isListed: boolean | null;
  highestBidder: string | null;
  minter: string | null;
}

const CarouselBAR = () => {
  const [allNft, setAllNft] = useState<allNftType[]>([]);
  const { contract } = useEthereum();
  const navigate = useNavigate();

  const getAllNft = async () => {
    try {
      const res: any = await contract?.getAllListedNfts();

      const nearDeadNft: allNftType[] = await Promise.all(
        res.map(async (curval: any) => {
          const link: any = await fetch(curval.metaDataUrl);
          const metaData: any = await link.json();
          const currentUnixTime = Math.floor(Date.now() / 1000);
          return {
            name: metaData.name,
            desc: metaData.description,
            image: metaData.image,
            owner: curval.owner,
            biddingTime: (Number(curval.biddingTime)+(86400*7)) - currentUnixTime , 
            startPrice: Number(curval.startPrice),
            currentPrice: Number(curval.currentPrice),
            royaltyFee: Number(curval.royaltyFee),
            tokenId: Number(curval.tokenId),
            isListed: curval.isListed,
            highestBidder: curval.highestBidder,
            minter: curval.minter,
          };
        })
      );
      const required: any = nearDeadNft.filter(
        (curval: allNftType) => curval.biddingTime && curval.biddingTime > 0
      );
      setAllNft([...required].slice(0,3));
    
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  const formattedTimeLeft = (bidTime : number | null) => {
    if (!bidTime || bidTime<=0) return "expired";
    
    const days: number = Math.round(Number(bidTime / 86400));
    const hours: number = Math.round(Number((bidTime % 86400)/3600));
    const mins: number = Math.round(Number((bidTime % 3600) / 60));
    const seconds: number = Math.round(Number(bidTime % 60));

    return `${days}d ${hours}h ${mins}m ${seconds}s`;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAllNft((prevNfts) =>
        prevNfts.map((nft) => {
          if (nft.biddingTime && nft.biddingTime > 0) {
            return {
              ...nft,
              biddingTime: nft.biddingTime - 1, 
            };
          }
          return nft;
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    getAllNft();
  }, []);

  return (
    <div className="border-2 shadow-md">
      <Carousel
        interval={3000}
        autoPlay
        infiniteLoop
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
      >
        {allNft.map((curval: allNftType) => (
          <div
            className="grid p-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-2"
            key={curval.tokenId}
          >
            <img
              className="md:h-80 sm:h-80 p-5 h-40 sm:md:px-20"
              src={curval.image!}
              alt={curval.name || "NFT Image"}
            />
            <div className="text-left flex flex-col gap-3">
              <h1 className="text-2xl font-bold text-blue-700">
                {curval.name}
              </h1>
              <p className="text-slate-700">{curval.desc?.slice(0, 35)}..</p>
              <b className="flex">
                Current Bid {ethers.formatEther(curval.currentPrice!?.toString())}{" "}
                <FaEthereum className="text-xl mt-0.5" />
              </b>
              <p className="text-red-500">
                Time Left: <b>{formattedTimeLeft(curval.biddingTime) }</b>
              </p>
              <button onClick={()=>navigate(`/SingleNft/${curval.tokenId}`)} className="bg-blue-800 text-white text-xl rounded-xl hover:font-bold w-40">
                Bid Now
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselBAR;
