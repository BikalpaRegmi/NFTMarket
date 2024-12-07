
const Nfts = () => {
  return (
    <div>
      <h1 className="text-blue-800 text-5xl font-bold ml-32 mt-5">All Nfts</h1>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
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

          <div className="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <img
              src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
              className="w-full mb-3"
            />
            <div className="p-4 pt-2">
              <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"></path>
                  </svg>
                  Members only
                </p>
                <a
                  href="#"
                  className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 inline-block"
                >
                  Can coffee make you a better developer?
                </a>
                <p className="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="flex items-center">
                <a href="#">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src="https://tailwindcss.com/img/jonathan.jpg"
                    alt="Avatar of Jonathan Reinink"
                  />
                </a>
                <div className="text-sm">
                  <a
                    href="#"
                    className="text-gray-900 font-semibold leading-none hover:text-indigo-600"
                  >
                    Jonathan Reinink
                  </a>
                  <p className="text-gray-600">Aug 18</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <img
              src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
              className="w-full mb-3"
            />
            <div className="p-4 pt-2">
              <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"></path>
                  </svg>
                  Members only
                </p>
                <a
                  href="#"
                  className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 inline-block"
                >
                  Can coffee make you a better developer?
                </a>
                <p className="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="flex items-center">
                <a href="#">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src="https://tailwindcss.com/img/jonathan.jpg"
                    alt="Avatar of Jonathan Reinink"
                  />
                </a>
                <div className="text-sm">
                  <a
                    href="#"
                    className="text-gray-900 font-semibold leading-none hover:text-indigo-600"
                  >
                    Jonathan Reinink
                  </a>
                  <p className="text-gray-600">Aug 18</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <img
              src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
              className="w-full mb-3"
            />
            <div className="p-4 pt-2">
              <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"></path>
                  </svg>
                  Members only
                </p>
                <a
                  href="#"
                  className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 inline-block"
                >
                  Can coffee make you a better developer?
                </a>
                <p className="text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="flex items-center">
                <a href="#">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src="https://tailwindcss.com/img/jonathan.jpg"
                    alt="Avatar of Jonathan Reinink"
                  />
                </a>
                <div className="text-sm">
                  <a
                    href="#"
                    className="text-gray-900 font-semibold leading-none hover:text-indigo-600"
                  >
                    Jonathan Reinink
                  </a>
                  <p className="text-gray-600">Aug 18</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nfts
