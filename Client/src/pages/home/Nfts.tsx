import { useState } from "react";
import { useEthereum } from "../../Contexts/contractContext";

interface allNftType {
  name: string | null;
  desc: string | null;
  image: string | null;
  owner: string | null;
  biddingTime: string | null;
  startPrice: number | null;
  currentPrice: number | null;
  royaltyFee: number | null;
  tokenId: number | null;
  isListed: boolean | null;
  highestBidder: string | null;
  minter : string | null;
}

const Nfts = () => {
  const [allNft, setAllNft] = useState<allNftType>({
 name:  null,
  desc:  null,
  image:  null,
  owner:  null,
  biddingTime:  null,
  startPrice:  null,
  currentPrice:  null,
  royaltyFee:  null,
  tokenId:  null,
  isListed: null,
  highestBidder:  null,
  minter :  null,
  });
  const { contract } = useEthereum();

  const getAllNft = async () => {
  try {
    const res: any = await contract?.getAllListedNfts();
    ayexi name same sabai aaune bana ani setallnft ma store gar voli exam assignment haru xa tyo vyaudai garxu ma aaile
  } catch (error) {
    console.log(error);
  }  
  }

  return (
    <div>
      <h1 className="text-blue-800 text-5xl font-bold ml-32 mt-5">All Nfts</h1>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
          
          {

          
            <div className="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col  leading-normal">
              <img
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                className="w-full mb-3"
              />
              <div className="p-4 pt-2">
                <div className="mb-8">
                  <p className=" font-bold text-lg mb-2 text-blue-600 inline-block">
                    Native Cat
                  </p>
                  <p className="text-gray-700 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, nulla! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                  </p>
                </div>
              
                <div className="text-sm">
                  <b
                   
                    className="text-gray-900 text-sm font-semibold leading-none hover:text-indigo-600"
                  >
                    0xf39Fd...92266
                  </b>
                  <p className="text-gray-600">00:03:45</p>
                </div>
              </div>
            </div>

          }
         
        </div>
      </div>
    </div>
  );
}

export default Nfts
