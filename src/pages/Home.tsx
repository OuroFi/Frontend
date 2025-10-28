import { useEffect, useState } from "react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string>("");

  const connect = () => {
    setIsConnected(true);
    setAccount("ALGORAND_ADDRESS_PLACEHOLDER");
  };

  const disconnect = () => {
    setIsConnected(false);
    setAccount("");
  };

  const initializeAlgorand = async () => {
    // Placeholder for Algorand initialization
    console.log("Initializing Algorand connection...");
  };



  return (
    <div className="w-full h-[100vh] bg-white mt-[100px]">
      <div className="flex flex-col items-start">
        <label className="mb-2" htmlFor="wallet">
          Wallet Address
        </label>
        <div className=" rounded-lg p-4 w-full">
          {isConnected ? (
            <div>
              <p
                className="text-black-600 font-bold"
                // value={formData.stellarAccountId}
                // onChange={handleChange}
              >
                Connected
              </p>
              <p className="text-sm">Account Address: {account}</p>
              {balance && <p className="text-sm"> Balance: {balance.toString()}</p>}
              <button className="mt-4" onClick={() => disconnect()}>
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <button className="mt-4" onClick={() => connect()}>
              Connect Wallet
            </button>
          )}
        </div>
        <button onClick={setProviderFunc}>Open Position</button>
      </div>
    </div>
  );
}
