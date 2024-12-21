import { FaEthereum } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const CarouselBAR = () => {
    const datas = [
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ];
  return (
    <div className="border-2 shadow-md">
      <Carousel interval={3000} autoPlay infiniteLoop showArrows={true} showStatus={false} showThumbs={false} showIndicators={false}>
              {datas.map((curval: string) => {
                  return (<>
                      <div className="grid p-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-2">                       
                          <img className="md:h-80 sm:h-80 p-5  h-40  sm:md:px-20" src={curval} alt="" />

                          <div className="text-left flex flex-col gap-3">
                      <h1 className="text-2xl font-bold text-blue-700">Name</h1>
                              <p className="text-slate-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo omnis magni expedita tempore! Magni deserunt quos ex quo unde. Corporis magni eveniet exercitationem sed aliquid nobis distinctio rem omnis doloremque laudantium ducimus voluptatum recusandae numquam, temporibus eligendi perspiciatis.</p>
                              <b className="flex"> Current Bid 3 <FaEthereum className="text-xl mt-0.5"/></b>
                              <p>Time Left : 0:4:54</p>
                              <button className="bg-blue-800 text-white text-xl rounded-xl hover:font-bold w-40">Bid Now</button>
                          </div>

                      </div>
                  </>)
        })}
      </Carousel>
    </div>
  );
}

export default CarouselBAR
