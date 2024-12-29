import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useEthereum } from "../../Contexts/contractContext";
import { ethers } from "ethers";

interface allNftType {
  name: null | string;
  desc: string | null;
  image: string | null | undefined;
  owner: string | null;
  biddingTime: string | null | number;
  startPrice: number | null;
  currentPrice: number | null | string;
  royaltyFee: number | null;
  tokenId: number | null;
  isListed: boolean | null;
  highestBidder: string | null;
  minter: string | null;
}

const CheckOut = () => {
  const [nftDetail, setNftDetail] = useState<allNftType>();
    const navigate = useNavigate();
    const { id } = useParams();
  const { contract } = useEthereum();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getMyData = async () => {
    try {
      const res: any = await contract?.getANft(id);
      const url: any = await fetch(res.metaDataUrl);
      const metaData: any = await url.json();
      const newRes: allNftType = {
        name: metaData.name,
        desc: metaData.description,
        image: metaData.image,
        owner: res.owner,
        biddingTime: Number(res.biddingTime) + (86400 * 7 + 3600),
        startPrice: Number(res.startPrice),
        currentPrice: Number(res.currentPrice),
        royaltyFee: Number(res.royaltyFee),
        tokenId: Number(res.tokenId),
        isListed: res.isListed,
        highestBidder: res.highestBidder,
        minter: res.minter,
      };

      setNftDetail(newRes);
    } catch (error) {
      console.log(error)
    }
  }

  const handleRelist = async () => {
  try {
    const transact: any = await contract?.reList(nftDetail?.tokenId , {value:ethers.parseEther(`0.001`)});
    await transact.wait();
    navigate('/');
  } catch (error) {
    console.log(error);
  }  
  }

  useEffect(() => {
    getMyData();
  },[contract , id]);
  return (
    <div>
      <IoCaretBackCircleOutline
        onClick={() => navigate("/myProfile")}
        className="absolute text-5xl cursor-pointer left-2 hover:shadow-lg rounded-full "
        title="Back"
      />
      <section className="text-gray-900 body-font bg-white ">
        <div className="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center">
          <div className="lg:flex-grow mt-5 md:mt-0   md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-2xl font-extrabold leading-9 tracking-tight mb-3 text-gray-900  sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal">
              {nftDetail?.name}
            </h1>
            <p className="mb-8 md:pl-0  pl-2 pr-2 leading-relaxed ">
              {nftDetail?.desc}
            </p>

            <p className="mb-8 md:pl-0 flex text-xl pl-2 pr-2 gap-2 leading-relaxed ">
              {nftDetail?.currentPrice
                ? ethers.formatEther(`${Number(nftDetail?.currentPrice)}`)
                : ""}{" "}
              <FaEthereum className="text-2xl mt-0.5" />
            </p>

            <p className="mb-8 md:pl-0 flex text-lg pl-2 pr-2 gap-2 leading-relaxed ">
              royaltyFee : {nftDetail?.royaltyFee} %
            
            </p>

            <b onClick={handleRelist} className="inline-flex cursor-pointer  text-white bg-emerald-600 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-700 rounded text-lg">
              Re-List NFT
            </b>
          </div>
          <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
            <img
              className="object-cover h-[499px] object-center rounded"
              alt="hero"
              src={nftDetail?.image!}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckOut;
