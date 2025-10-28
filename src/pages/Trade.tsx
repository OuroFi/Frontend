import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TradingViewWidget from "../components/TradingView";
import { Symbols } from "../types";
import { getSymbolPrice } from "../utils/GetSymbolPrice";

export default function Trade() {
  const { symbol } = useParams();
  const [price, setPrice] = useState<number>(4078.15);
  const [activeTab, setActiveTab] = useState<"MARKET" | "LIMIT">("MARKET");
  const [orderType, setOrderType] = useState<"BUY" | "SELL">("BUY");
  const [amount, setAmount] = useState<string>("10");
  const [leverage, setLeverage] = useState<number>(50);

  useEffect(() => {
    if (symbol) {
      getSymbolPrice(symbol as keyof typeof Symbols).then(setPrice);
    }
  }, [symbol]);

  const currentSymbol = symbol?.replace("USD", "") || "ETH";
  const priceChange = -3.68;
  const indexPrice = "4077.50";
  const fundingRate = "-0.0028%/hr";
  const marketSkew = "96.46K";

  const handleBuyLong = () => {
    console.log("Buy/Long order:", { amount, leverage, orderType });
  };

  const renderTimeframes = () => {
    const timeframes = ["1m", "5m", "15m", "30m", "1hr", "4hr", "D"];
    return (
      <div className="flex space-x-1 mb-4">
        {timeframes.map((tf) => (
          <button
            key={tf}
            className={`px-3 py-1.5 text-xs font-medium rounded ${
              tf === "30m"
                ? "bg-gray-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            }`}
          >
            {tf}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{
      backgroundColor: 'var(--rk-colors-modalBackground)',
      color: 'var(--rk-colors-modalText)'
    }}>
      {/* Header with price info */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{currentSymbol}</span>
              </div>
              <h1 className="text-xl font-semibold">{currentSymbol} / USD</h1>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            <div className="text-2xl font-bold text-red-400">
              {price.toLocaleString()}
              <span className="text-red-400 text-lg ml-2">{priceChange}%</span>
            </div>

            {/* Market stats */}
            <div className="flex space-x-6 text-sm">
              <div>
                <div className="text-gray-400 text-xs">Index Price</div>
                <div className="text-white font-medium">{indexPrice}</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs">Funding Rate</div>
                <div className="text-white font-medium">{fundingRate}</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs">Market Skew</div>
                <div className="text-white font-medium">{marketSkew}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-700 rounded transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main content area with chart and overlay panel */}
      <div className="relative px-6">
        {/* Chart container */}
        <div className="relative">
          {/* Timeframes */}
          {renderTimeframes()}

          {/* Chart area */}
          <div className="h-[600px] relative bg-[#1a1a1a]">
            <TradingViewWidget symbol={`${currentSymbol}USD`} />

            {/* Overlaid Trading Panel */}
            <div className="absolute top-4 right-4 w-80 rounded-lg p-4" style={{
              backgroundColor: 'var(--rk-colors-modalBackground)',
              border: '1px solid var(--rk-colors-generalBorder)',
              borderRadius: 'var(--rk-radii-modal)'
            }}>
              {/* Market/Limit tabs */}
              <div className="flex mb-4 text-sm">
                {["MARKET", "LIMIT"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as "MARKET" | "LIMIT")}
                    className={`flex-1 py-2 px-4 font-medium transition-colors ${
                      activeTab === tab
                        ? "border-b-2"
                        : "hover:opacity-80"
                    }`}
                    style={{
                      color: activeTab === tab ? 'var(--rk-colors-modalText)' : 'var(--rk-colors-modalTextSecondary)',
                      borderBottomColor: activeTab === tab ? 'var(--rk-colors-accentColor)' : 'transparent'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Price display on right */}
              <div className="text-right mb-4">
                <div className="text-xs text-gray-400 mb-1">4280.00</div>
                <div className="text-xs text-gray-400 mb-1">4240.00</div>
                <div className="text-xs text-gray-400 mb-1">4200.00</div>
                <div className="text-xs text-gray-400 mb-1">4160.00</div>
                <div className="text-xs text-gray-400 mb-1">4120.00</div>
                <div className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded mb-1">4077.50</div>
                <div className="text-xs text-gray-400 mb-1">4040.00</div>
                <div className="text-xs text-gray-400 mb-1">4000.00</div>
                <div className="text-xs text-gray-400 mb-1">3960.00</div>
                <div className="text-xs text-gray-400">3920.00</div>
              </div>

              {/* Buy/Sell tabs */}
              <div className="flex mb-4 rounded-lg p-1" style={{
                backgroundColor: 'var(--rk-colors-actionButtonSecondaryBackground)'
              }}>
                {["BUY", "SELL"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type as "BUY" | "SELL")}
                    className={`flex-1 py-2 px-4 rounded text-sm font-bold transition-colors ${
                      orderType === type ? "" : "hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor: orderType === type
                        ? (type === "BUY" ? 'var(--rk-colors-connectionIndicator)' : 'var(--rk-colors-error)')
                        : 'transparent',
                      color: orderType === type
                        ? (type === "BUY" ? '#000' : 'var(--rk-colors-modalText)')
                        : 'var(--rk-colors-modalTextSecondary)',
                      borderRadius: 'var(--rk-radii-connectButton)'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Amount input */}
              <div className="mb-4">
                <label className="block text-xs mb-2 font-medium" style={{
                  color: 'var(--rk-colors-modalTextSecondary)'
                }}>PAY</label>
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 text-sm"
                    placeholder="0.00"
                    style={{
                      backgroundColor: 'var(--rk-colors-actionButtonSecondaryBackground)',
                      border: '1px solid var(--rk-colors-generalBorder)',
                      borderRadius: 'var(--rk-radii-connectButton)',
                      color: 'var(--rk-colors-modalText)'
                    }}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <span className="text-white font-medium text-sm">USDC</span>
                    <button className="text-gray-400 hover:text-white">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Leverage */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs text-gray-400 font-medium">LEVERAGE</label>
                  <span className="text-white font-medium text-sm">{leverage}x</span>
                </div>

                {/* Custom leverage slider */}
                <div className="relative mb-2">
                  <input
                    type="range"
                    min="1"
                    max="150"
                    value={leverage}
                    onChange={(e) => setLeverage(Number(e.target.value))}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer leverage-slider"
                  />
                  <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-[#1a1a1a] cursor-pointer"
                       style={{ left: `${((leverage - 1) / 149) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>3x - Safe</span>
                  <span className="text-purple-400">Degen - 150x</span>
                </div>
              </div>

              {/* Buy/Long button */}
              <button
                onClick={handleBuyLong}
                className="w-full py-3 font-bold text-sm transition-colors hover:opacity-90"
                style={{
                  backgroundColor: orderType === "BUY"
                    ? 'var(--rk-colors-connectionIndicator)'
                    : 'var(--rk-colors-error)',
                  color: orderType === "BUY" ? '#000' : 'var(--rk-colors-modalText)',
                  borderRadius: 'var(--rk-radii-connectButton)',
                  border: 'none',
                  boxShadow: 'var(--rk-shadows-connectButton)'
                }}
              >
                {orderType} / {orderType === "BUY" ? "LONG" : "SHORT"}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom tabs */}
        <div className="mt-6 mb-6">
          <div className="flex space-x-8 border-b border-gray-700">
            <button className="pb-3 text-white border-b-2 border-white font-medium">
              Positions
            </button>
            <button className="pb-3 text-gray-400 hover:text-white transition-colors">
              Orders
            </button>
            <button className="pb-3 text-gray-400 hover:text-white transition-colors">
              History
            </button>
            <div className="ml-auto flex items-center">
              <input type="checkbox" className="mr-2 text-xs" />
              <span className="text-gray-400 text-xs">Include Fees</span>
            </div>
          </div>
          <div className="py-8">
            <div className="text-center text-gray-500 text-sm">
              No positions found
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for leverage slider */}
      <style jsx>{`
        .leverage-slider {
          background: linear-gradient(90deg, #4ade80 0%, #3b82f6 50%, #8b5cf6 100%);
        }

        .leverage-slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #1a1a1a;
        }

        .leverage-slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #1a1a1a;
        }
      `}</style>
    </div>
  );
}