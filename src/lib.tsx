export const environments = { LOCAL: "local", TESTNET: "testnet" };
export const environment =
  process.env.VITE_DAPP_ENVIRONMENT || environments.LOCAL;
export const isLocal = environment === environments.LOCAL;
export const isTestnet = environment === environments.TESTNET;

export const renderTransactionId = (transactionId: string) => {
  return (
    <a
      href={`https://algoexplorer.io/tx/${transactionId}`}
      target="_blank"
      rel="noreferrer"
      className="underline"
    >
      {transactionId}
    </a>
  );
};

export const renderFormattedBalance = (balance: number | string) => {
  return Number(balance).toFixed(4);
};
