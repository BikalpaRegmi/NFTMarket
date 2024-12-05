
const CreateListing = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
    <div className="bg-blue-700  p-8 rounded-3xl shadow-2xl  max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8 neon-text">Create Nft</h1>
        <form className="space-y-6">
            <div className="relative">
                <input type="text" placeholder="Username" className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"/>
                <i className="fas fa-user absolute right-3 top-3 text-pink-500"></i>
            </div>
            <div className="relative">
                <input type="email" placeholder="Email" className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"/>
                <i className="fas fa-envelope absolute right-3 top-3 text-pink-500"></i>
            </div>
            <div className="relative">
                <input type="password" placeholder="Password" className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"/>
                <i className="fas fa-lock absolute right-3 top-3 text-pink-500"></i>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                Sign Up
            </button>
        </form>
        <div className="mt-8 text-center">
            <p className="text-gray-400">Listing Fee 0.001 ETH</p>         
        </div>
    </div>
   

    </div>
  )
}

export default CreateListing
