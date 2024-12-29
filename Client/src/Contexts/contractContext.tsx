import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import abi from "../abi/abi.json"

interface ContractContextType {
  contract: ethers.Contract | null;
    account: string | null;
    template: () => Promise<void>;
}

declare global{
    interface Window{
        ethereum: any;
    }
}

const ethereumContext = createContext<undefined | ContractContextType>(undefined);

export const EthereumContextProvider = ({ children }: any) => {
    const [state, setState] = useState<
      Pick<ContractContextType, "contract" | "account">
    >({
      contract: null,
      account: null,
    });

    const template = async()=> {
        if (!window.ethereum) alert("Plz Install Metamask First");

        const contractAddress: string =
          "0x59b670e9fA9D0A427751Af201D676719a970857b";
        const contractAbi: any = abi.abi;

        try {
                    const account:string[] = await window.ethereum.request({
                      method: "eth_accounts",
                    });
            
window.ethereum.on("accountsChanged", () => {
  window.location.reload();
});

            if (window.ethereum && state.account==null) {
                const provider: ethers.BrowserProvider = new ethers.BrowserProvider(window.ethereum);

                const signer: ethers.Signer = await provider.getSigner();
                const contract: ethers.Contract = new ethers.Contract(contractAddress, contractAbi, signer);

                setState((prev) => ({ ...prev, account: account[0], contract: contract}));
            }
           

        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        template()
    }, []);

    return (<>
    <ethereumContext.Provider value={{...state , template}}>
        {children}
    </ethereumContext.Provider>
    </>)
} 

export const useEthereum = () => {
    const context = useContext(ethereumContext);
    if (!context) throw new Error("Plz wrap ur code on provider");
    return context;
}