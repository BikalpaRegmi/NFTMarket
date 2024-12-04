import { useEthereum } from "../Contexts/contractContext";

const MetamaskConn = () => {

    const { template ,account} = useEthereum();

    const connectAccount = () => {
        template();
        console.log(account);
    }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <h1 className="text-center text-5xl text-lime-500 mt-5">
          Please connect MetaMask to continue!
        </h1>
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-2/3 flex flex-col justify-around sm:flex-row sm:items-center mx-auto">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaTIJOgm7Qwws9XEsmz2riEyD66JNU-yyQMw47JxtUV4rNymMN2raY_SmEQ24xppOB-5o&usqp=CAU"
              alt=""
              className="w-80"
            />
            <button
              onClick={connectAccount}
              className="flex-shrink-0 text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-3xl mt-10 sm:mt-0"
            >
              Connect MetaMask
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MetamaskConn
