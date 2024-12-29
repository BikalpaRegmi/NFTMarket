import { useNavigate, useParams } from "react-router-dom"
import { useEthereum } from "../../Contexts/contractContext";
import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { ethers } from "ethers";
  import { ToastContainer, toast } from "react-toastify";

interface allNftType {
  name: null | string;
  desc: string | null;
  image: string | null |undefined;
  owner: string | null;
  biddingTime: string | null | number;
  startPrice: number | null;
  currentPrice: number | null |string;
  royaltyFee: number | null;
  tokenId: number | null;
  isListed: boolean | null;
  highestBidder: string | null;
  minter: string | null;
}

const SinglePage = () => {
    const { id } = useParams();
    const { contract,account } = useEthereum();
    const [nftDetail, setNftDetail] = useState<allNftType>();
    const navigate = useNavigate();
    const [showInput, setShowInput] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>();

    const getNft = async () => {
    try {
      const res: any = await contract?.getANft(id);
      const url: any = await fetch(res.metaDataUrl);
        const metaData: any = await url.json();
      const newRes: allNftType = {
        name: metaData.name,
        desc: metaData.description,
        image: metaData.image,
        owner: res.owner,
        biddingTime: Number(res.biddingTime)+(86400*7 + 3600) ,
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
  
  const handleFinalize = async () => {
    try {
     
      
        const transaction: any = await contract?.finalizeBidding(
          nftDetail?.tokenId,
          
        );
        await transaction.wait();
        navigate(`/myProfile`);
      

    } catch (error) {
      console.log(error)
    }
  }

    const handleSubmit = async () => {
        if (amount == undefined || amount == null) setShowInput(false)
        else if (isNaN(amount)) toast.error("Not valid number");
            
        else {
            const transaction = await contract?.participateBidding(id, { value: ethers.parseEther(`${amount}`) });
            await transaction.wait();
            toast('YOU ARE THE HIGHEST BIDDER');
            setShowInput(false);
        }
    }
   
  useEffect(() => {
    getNft();
  }, [id]);
  
  return (
    <div>
      <div>
        <IoCaretBackCircleOutline
          onClick={() => navigate("/")}
          className="absolute text-5xl cursor-pointer left-2 hover:shadow-lg rounded-full "
          title="Back"
        />
        <section className="text-gray-900 body-font bg-white ">
          <div className="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center">
            <div className="lg:flex-grow mt-5 md:mt-0   md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="text-2xl capitalize font-extrabold leading-9 tracking-tight mb-3 text-gray-900  sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal">
                {nftDetail?.name}
              </h1>
              <p className="mb-8 md:pl-0  pl-2 pr-2 leading-relaxed ">
                {nftDetail?.desc}
              </p>
              <p className="mb-8 md:pl-0 flex text-xl pl-2 pr-2 gap-2 leading-relaxed ">
                {nftDetail?.currentPrice
                  ? ethers.formatEther(nftDetail.currentPrice.toString())
                  : "Not Available"}{" "}
                <FaEthereum className="text-2xl mt-0.5" />{" "}
                <i
                  className={`${
                    account?.toLowerCase() ===
                    nftDetail?.highestBidder?.toLowerCase()
                      ? "block"
                      : "hidden"
                  } text-sm mt-1.5 text-blue-500`}
                >
                  (Currently You Are Highest Bidder of this nft)
                </i>
              </p>
              <p>Owner : {nftDetail?.owner}</p>
              <p>Royalty Fee : {nftDetail?.royaltyFee}%</p>
              <p>
                Bidding Ends On :{" "}
                {nftDetail?.biddingTime
                  ? new Date(
                      Number(nftDetail.biddingTime) * 1000
                    ).toLocaleString()
                  : "No time left"}
              </p>
              {!showInput ? (
                <button
                  disabled={
                    nftDetail?.owner?.toLowerCase() ===
                      account?.toLowerCase() ||
                    Number(nftDetail?.biddingTime) <
                      Math.floor(Date.now() / 1000)
                  }
                  onClick={() => setShowInput(true)}
                  className={`inline-flex cursor-pointer mt-3 text-white bg-emerald-600 border-0 py-2 px-6 focus:outline-none ${
                    nftDetail?.owner?.toLowerCase() ===
                      account?.toLowerCase() ||
                    Number(nftDetail?.biddingTime) <
                      Math.floor(Date.now() / 1000)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-emerald-700"
                  } rounded text-lg hover:translate-x-3 transition-transform  ease-in-out duration-500`}
                >
                  ParticipateBidding
                </button>
              ) : (
                <div className="flex">
                  <input
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAmount(parseFloat(e.target.value))
                    }
                    name=""
                    id=""
                    className="border-2 mt-3 mr-3 pl-2"
                    placeholder="Enter a amount (Eth)"
                  />
                  <button
                    disabled={
                      nftDetail?.owner?.toLowerCase() === account?.toLowerCase()
                    }
                    onClick={handleSubmit}
                    className={`inline-flex cursor-pointer mt-3 text-white bg-emerald-600 border-0 py-2 px-6 focus:outline-none ${
                      nftDetail?.owner?.toLowerCase() === account?.toLowerCase()
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-emerald-700"
                    } rounded text-lg`}
                  >
                    Submit
                  </button>
                </div>
              )}
              <button onClick={handleFinalize} className={`${account?.toLowerCase() === nftDetail?.owner?.toLowerCase() ? "block" : "hidden"} rounded inline-flex cursor-pointer mt-3 text-white bg-pink-700 border-0 py-2 px-6 focus:outline-none`}>
                Finalize Bidding
              </button>
            </div>
            <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
              <img
                className="object-cover h-[499px] object-center rounded"
                alt="hero"
                src={nftDetail?.image || ""}
              />
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SinglePage
