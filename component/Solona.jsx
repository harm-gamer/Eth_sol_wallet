import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import {derivePath} from "ed25519-hd-key";
import {Keypair} from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({mnemonic}){
    const [currentIndex,setCurrentIdx] = useState(0);
    const [publicKeys,setPublicKeys] = useState([]);

    return <div>
        <button onClick={function(){
            const seed = mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0`;
            const deriveSeed = derivePath(path,seed.toString("hex")).key;

            const secret = nacl.sign.keypair.fromSeed(deriveSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIdx(currentIndex + 1);
            setPublicKeys([...publicKeys,keypair.publicKey]);

        }}>
            Add wallet
        </button>
        {publicKeys.map(p=> <div>
            {p.toBase58()}
        </div>)}
    </div>
}