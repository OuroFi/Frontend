import { useState, useEffect } from "react";

import Button from "./Button";
import { renderFormattedBalance } from "../lib.tsx";

export default function Wallet() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const connect = () => {
    // Placeholder for Algorand wallet connection
    setAddress("ALGORAND_ADDRESS_PLACEHOLDER");
    setBalance(100);
    setIsConnected(true);
  };

  const disconnect = () => {
    setAddress("");
    setBalance(0);
    setIsConnected(false);
  };

  const refreshBalance = () => {
    // Placeholder for balance refresh
    console.log("Refreshing balance...");
  };

  if (!isConnected) {
    return (
      <div className="text-center">
        <Button onClick={connect} className="w-full">
          Connect Algorand Wallet
        </Button>
        <p className="mt-4 text-sm text-zinc-300/70">
          Connect your Algorand wallet to interact with the application.
        </p>
      </div>
    );
  }

  return (
    <>
      <div>
        <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
          Address
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-between text-base dark:text-zinc-50">
          <input
            type="text"
            value={address}
            className="w-2/3 bg-gray-800 rounded-md mb-2 md:mb-0 px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <Button onClick={disconnect} className="w-1/3">
            Disconnect
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
          Balance
        </h3>
        <div className="flex items-center justify-between text-base dark:text-zinc-50">
          <input
            type="text"
            value={`${renderFormattedBalance(balance)} ALGO`}
            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <Button onClick={refreshBalance} className="w-1/3">
            Refresh
          </Button>
        </div>
      </div>
      <div>
        <p>
          Algorand supports various wallet integrations. You can read more about
          Algorand development{" "}
          <a
            href="https://developer.algorand.org/"
            className="text-green-500/80 transition-colors hover:text-green-500"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>
    </>
  );
}
