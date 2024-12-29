import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEthereum } from "../../Contexts/contractContext";
import { ethers } from "ethers";

interface MyNftsType {
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
  minter: string | null;
}

const MYProfile = () => {
  const navigate = useNavigate();
  const [myNft, setMyNft] = useState<MyNftsType[]>([]);
  const [totalAsset, setTotalAsset] = useState<number>(0);
  const { contract, account } = useEthereum();

  const getMyNfts = async () => {
    try {
      const res: any = await contract?.getAllListedNfts();
      let Asset: number = 0;

      const newRes: MyNftsType[] = await Promise.all(
        res.map(async (curval: any) => {
          const url: any = await fetch(curval.metaDataUrl);
          const metaData: any = await url.json();
          if (
            curval.owner.toLowerCase() === account?.toLowerCase() &&
            curval.isListed === false
          )
          {
            Asset += Number(curval.currentPrice);
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
      );
      setTotalAsset(Asset);
      setMyNft(newRes.filter(Boolean));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyNfts();
  }, []);
  return (
    <div className="bg-gray-100">
      <nav className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4">
          <i className="text-2xl font-bold"> My Nfts </i>
        </div>
      </nav>

      <header className="py-20 bg-gradient-to-b from-blue-900 to-blue-800 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4">
            👋 Hey there! Your current NFT asset is {ethers.formatEther(`${totalAsset}`)} Eth 🎉
          </h1>
          <p className="mt-2 text-lg text-gray-200">
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">
            🚀 NFT That You Own
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {myNft.length > 0 ? (
              myNft.map((curval: MyNftsType) => {
                return (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={curval.image!}
                      alt="Project Image"
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-4">{curval.name}</h3>
                      <p className="text-gray-700">{curval.desc}</p>
                      <u
                        onClick={() => {
                          navigate(`/myProfile/${curval.tokenId}`);
                        }}
                        className="block cursor-pointer hover:text-purple-500 text-blue-600 hover:underline mt-4"
                      >
                        Check it out{"->"}
                      </u>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xl mx-auto text-blue-500 animate-pulse w-full">
                You Dont Own Any Nft That Is Not Listed
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MYProfile
