import { useState } from "react"
import axios from "axios";
  import { ToastContainer, toast } from "react-toastify";

interface FormInputType {
  name: string | null;
  description: string | null;
  price: number | null;
  Royalty: number | null;
}
const CreateListing = () => {
  const [imgUrl, setImgUrl] = useState<string>();
  const [file, setFile] = useState<File | null>();
  const [formInput, setFormInout] = useState<FormInputType>({
    name: null,
    description: null,
    price: null,
    Royalty: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormInout((prev) => ({
      ...prev, [e.target.name]: e.target.value,
    }))
    
  }
  
  const uploadData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formInput.name == null ||
      formInput.description == null ||
      formInput.price == null ||
      formInput.Royalty == null || file == null
    ) {
      toast.error("Plz Input All The Fields");
    } else {
      toast.success("Creating Nft Plz Wait For a Minute")
      try {
        const fileData: FormData = new FormData();
        if (file != null) {
          fileData.append("file", file);
        }
        const res: any = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          fileData,
          {
            headers: {  
              pinata_api_key: import.meta.env.VITE_API_KEY,
              pinata_secret_api_key: import.meta.env.VITE_API_SECRET,
            },
          }
        );

        const imgUrl: string = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash;
        
        const nftUrl: any = {
          name: formInput.name,
          description: formInput.description,
          image:imgUrl,
        }
        
        const urlRes: any = await axios.post(
          "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          nftUrl,
          {
            headers: {
              pinata_api_key: import.meta.env.VITE_API_KEY,
              pinata_secret_api_key: import.meta.env.VITE_API_SECRET,
            },
          }
        );
        
        const urlLink: string = "https://gateway.pinata.cloud/ipfs/" + urlRes.data.IpfsHash;

        console.log(urlLink);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const createNft = (image: string) => {
  
  }
  
  return (
    <div className="h-[100vh] bg-cover bg-[url('https://thumbs.dreamstime.com/b/abstract-grey-curve-overlap-white-luxury-background-vector-abstract-grey-curve-overlap-white-luxury-background-vector-336372975.jpg')] bg-slate-300  flex flex-col justify-center items-center">
      <div className="bg-blue-700  p-8 rounded-3xl shadow-2xl  max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8 neon-text">
          Create Nft
        </h1>
        <form className="space-y-6" onSubmit={uploadData}>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formInput.name!}
              onChange={handleChange}
              placeholder="Nft name"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
            <i className="fas fa-user absolute right-3 top-3 text-pink-500"></i>
          </div>
          <div className="relative">
            <textarea
              name="description"
              value={formInput.description!}
              onChange={handleChange}
              placeholder="Description"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
            <i className="fas fa-envelope absolute right-3 top-3 text-pink-500"></i>
          </div>
          <div className="relative">
            <input
              type="number"
              onChange={handleChange}
              value={formInput.price!}
              name="price"
              placeholder="Nft price on eth"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
            <i className="fas fa-user absolute right-3 top-3 text-pink-500"></i>
          </div>

          <div className="relative">
            <input
              type="number"
              onChange={handleChange}
              value={formInput.Royalty!}
              name="Royalty"
              placeholder="Royalty %"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
            <i className="fas fa-user absolute right-3 top-3 text-pink-500"></i>
          </div>

          <div className="relative">
            <input
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFile(e.target.files && e.target.files[0]);
              }}
              placeholder="file"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
            <i className="fas fa-lock absolute right-3 top-3 text-pink-500"></i>
          </div>
          <div className=" text-sm text-center">
            <p className="text-gray-400">Bidding Fee 0.001 ETH</p>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Start Bidding
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default CreateListing
