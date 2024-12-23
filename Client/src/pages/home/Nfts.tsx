import { useEffect, useState } from "react";
import { useEthereum } from "../../Contexts/contractContext";

interface allNftType {
  name: null | string;
  desc: string | null;
  image: string | null;
  owner: string | null;
  biddingTime: string | null | number;
  startPrice: number | null;
  currentPrice: number | null;
  royaltyFee: number | null;
  tokenId: number | null;
  isListed: boolean | null;
  highestBidder: string | null;
  minter : string | null;
}

const Nfts = () => {
  const [allNft, setAllNft] = useState<allNftType[]>([]);
  const { contract } = useEthereum();

  const getAllNft = async () => {
  try {
    const res: any = await contract?.getAllListedNfts();

    const nftData: allNftType[] = await Promise.all(
      res.map(async (curval: any) => {
        const response: any = await fetch(curval.metaDataUrl);
        const metaData: any = await response.json();

        const currentTime = Math.floor(Date.now() / 1000); 
        if (curval.isListed) {
          if (curval.biddingTime && currentTime >= Number(curval.biddingTime) + (86400 * 6) - 3600) {
            await contract?.finalizeBidding(curval.tokenId);
          }
          return {
            name: metaData.name,
            desc: metaData.description,
            image: metaData.image,
            owner: curval.owner,
            biddingTime: Number(curval.biddingTime),
            startPrice: Number(curval.startPrice),
            currentPrice: Number(curval.currentPrice),
            royaltyFee: Number(curval.royaltyFee),
            tokenId: Number(curval.tokenId),
            isListed: curval.isListed,
            highestBidder: curval.highestBidder,
            minter: curval.minter,
          };
        }
      })
    )
    setAllNft([...nftData].reverse());
  } catch (error) {
    console.log(error);
  }  
  }

  useEffect(() => {
    getAllNft();
},[])
  return (
    <div>
      <h1 className="text-blue-800 text-5xl font-bold ml-32 mt-5">All Nfts</h1>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
          {allNft.map((curval:allNftType) => {
            return (
              <div key={curval.tokenId} className="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col  leading-normal">
                <img src={curval.image!} className="w-full mb-3" />
                <div className="p-4 pt-2">
                  <div className="mb-8">
                    <p className=" font-bold text-lg mb-2 text-blue-600 inline-block">
                      {curval.name}
                    </p>
                    <p className="text-gray-700 text-sm">
                      {curval.desc?.slice(0, 35)} {"..."}
                    </p>
                  </div>

                  <div className="text-sm">
                    <b className="text-gray-900 text-sm font-semibold leading-none hover:text-indigo-600">
                      {`${curval.owner?.slice(0, 5)}...${curval.owner?.slice(
                        curval.owner.length - 5,
                        curval.owner.length
                      )}`}
                    </b>
                    <p className="text-gray-600">
                      {" "}
                      {curval.biddingTime
                        ? new Date(
                            Number(curval.biddingTime) * 1000
                          ).toLocaleString() // Convert timestamp to date
                        : "No Bidding Time"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Nfts
