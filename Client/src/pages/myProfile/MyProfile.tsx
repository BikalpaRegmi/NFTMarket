import { useNavigate } from "react-router-dom";

const MYProfile = () => {
    const navigate = useNavigate();
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
            👋 Hey there! Your current NFT asset is 0.9 eth 🎉
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.pexels.com/photos/69932/tabby-cat-close-up-portrait-69932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Project Image"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Cat Image</h3>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam.
                  🐱
                </p>
                <u
                  onClick={() => {navigate(`/myProfile/id`);  }}
                  className="block cursor-pointer hover:text-purple-500 text-blue-600 hover:underline mt-4"
                >
                  Check it out{'->'}
                </u>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://picsum.photos/seed/picsum/400/400"
                alt="Project Image"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Project Title</h3>
                <p className="text-gray-700">
                  This project is so cool, even my cat approves! 🐱
                </p>
                <u
                  onClick={() => navigate(`/myProfile/id`)}
                  className="block cursor-pointer hover:text-purple-500 text-blue-600 hover:underline mt-4"
                >
                  Check it out{'->'}
                </u>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://picsum.photos/seed/picsum/400/400"
                alt="Project Image"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Project Title</h3>
                <p className="text-gray-700">
                  This project is so cool, even my cat approves! 🐱
                </p>
                <u
                  onClick={() => navigate(`/myProfile/id`)}
                  className="block cursor-pointer hover:text-purple-500  text-blue-600 hover:underline mt-4"
                >
                  Check it out{'->'}
                </u>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MYProfile
