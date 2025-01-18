import { mnemonicToSeed } from "bip39";
import { useState } from "react"
import {Wallet,HDNodeWallet}  from "ethers6";

export const EthWallet = ({mnemonic}) =>{
    const [currentIndex,setCurrentIdx] = useState(0);
    const [address,setAddress] = useState([]);

    return(
        <div>
            <button onClick={ async function(){
                const seed = mnemonicToSeed(mnemonic);
                const derivePath = `m/44'/60'/${currentIndex}'/0`;
                const hdNode = HDNodeWallet.fromSeed(seed);
                const child = hdNode.derivePath(derivePath);
                const privateKey = child.privateKey;
                const wallet = new Wallet(privateKey);
                setCurrentIdx(currentIndex + 1);
                setAddress([...address,wallet.address]);
            }}
            >
                Add ETH wallet
            </button>
            {address.map(p => <div>
                Eth - {p}
            </div>)}
        </div>
    )
}