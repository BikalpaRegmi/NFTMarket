import { useEffect } from "react";
import { FaEthereum } from "react-icons/fa";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const CheckOut = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id])
    
  return (
      <div>
          <IoCaretBackCircleOutline onClick={()=>navigate('/myProfile')} className="absolute text-5xl cursor-pointer left-2 hover:shadow-lg rounded-full " title="Back"/>
      <section className="text-gray-900 body-font bg-white ">
        <div className="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center">
          <div className="lg:flex-grow mt-5 md:mt-0   md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-2xl font-extrabold leading-9 tracking-tight mb-3 text-gray-900  sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal">
              Title of Project
            </h1>
            <p className="mb-8 md:pl-0  pl-2 pr-2 leading-relaxed ">
              Short description here, Short description here Short description
              here Short description here Short description here Short
              description here.
            </p>

            <p className="mb-8 md:pl-0 flex text-xl pl-2 pr-2 gap-2 leading-relaxed ">
              0.02 <FaEthereum className="text-2xl mt-0.5" />
            </p>

            
              <b className="inline-flex cursor-pointer  text-white bg-emerald-600 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-700 rounded text-lg">
                Re-List NFT
              </b>
            
          </div>
          <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://images.pexels.com/photos/69932/tabby-cat-close-up-portrait-69932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckOut;
