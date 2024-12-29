import { useEffect, useState } from "react";
import { useEthereum } from "../../Contexts/contractContext";
import { useNavigate } from "react-router-dom";

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
  minter: string | null;
}

const Nfts = () => {
  const [allNft, setAllNft] = useState<allNftType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  const { contract } = useEthereum();
  const navigate = useNavigate();

  const getAllNft = async () => {
    try {
      const res: any = await contract?.getAllListedNfts();

      const nftData: allNftType[] = await Promise.all(
        res.map(async (curval: any) => {
          const response: any = await fetch(curval.metaDataUrl);
          const metaData: any = await response.json();

          if (curval.isListed) {
            
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
      setAllNft([...nftData.filter(Boolean)].reverse()); 
      console.log(nftData[0].biddingTime, nftData[0].name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNft();
  }, []);

  // Pagination logic
  const lastIndex: number = currentPage * itemsPerPage;
  const firstIndex: number = lastIndex - itemsPerPage;
  const currentItems: allNftType[] = allNft.slice(firstIndex, lastIndex);

  const nextPage = () => {
    if (currentPage < Math.ceil(allNft.length / itemsPerPage)) {
      setCurrentPage(currentPage+1);
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage-1);
    }
  }

  return (
    <div>
      <h1 className="text-blue-800 text-5xl font-bold ml-32 mt-5">All Nfts</h1>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
          {currentItems.map((curval: allNftType) => (
            <div
              key={curval.tokenId}
              className="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col  leading-normal"
            >
              <img src={curval.image!} className="w-full mb-3" />
              <div className="p-4 pt-2">
                <div className="mb-8">
                  <p
                    onClick={() => navigate(`/SingleNft/${curval.tokenId}`)}
                    className="cursor-pointer hover:underline font-bold text-lg mb-2 text-blue-600 inline-block"
                  >
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
                        ).toLocaleString()
                      : "No Bidding Time"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-5">
          <button
            onClick={prevPage}
            className={`bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            onClick={nextPage}
            className={`bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ${
              currentPage === Math.ceil(allNft.length / itemsPerPage)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentPage === Math.ceil(allNft.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nfts;
