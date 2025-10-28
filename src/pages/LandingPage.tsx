import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSymbolPrice } from "../utils/GetSymbolPrice";

export default function LandingPage() {
  const [ethPrice, setEthPrice] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    getSymbolPrice("ETHUSD").then(setEthPrice);
  }, []);

  const popularMarkets = [
    { symbol: "ETH", name: "Ethereum", price: ethPrice, change: -3.23 },
    { symbol: "BTC", name: "Bitcoin", price: 68500, change: 2.41 },
    { symbol: "SOL", name: "Solana", price: 210.5, change: -1.87 },
    { symbol: "ALGO", name: "Algorand", price: 0.35, change: 1.24 },
  ];

  const features = [
    {
      title: "Perpetual Trading",
      description: "Trade crypto futures without expiration dates",
      icon: "📈",
    },
    {
      title: "High Leverage",
      description: "Up to 150x leverage for maximum capital efficiency",
      icon: "⚡",
    },
    {
      title: "Low Fees",
      description: "Competitive trading fees and deep liquidity",
      icon: "💰",
    },
    {
      title: "Advanced Tools",
      description: "Professional trading interface with TradingView charts",
      icon: "🛠️",
    },
  ];

  return (
    <div className="min-h-screen pt-20" style={{
      backgroundColor: 'var(--rk-colors-modalBackground)',
      color: 'var(--rk-colors-modalText)'
    }}>
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6">
            Trade Crypto
            <span className="block bg-gradient-to-r bg-clip-text text-transparent" style={{
              backgroundImage: `linear-gradient(135deg, var(--rk-colors-accentColor) 0%, var(--rk-colors-connectionIndicator) 100%)`
            }}>
              Perpetuals
            </span>
          </h1>
          <p className="text-xl mb-10 leading-relaxed" style={{
            color: 'var(--rk-colors-modalTextSecondary)'
          }}>
            Experience the next generation of derivatives trading with Ouro Finance.
            Trade crypto perpetuals with up to 150x leverage, advanced tools, and institutional-grade infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/trade/ALGOUSD")}
              className="px-8 py-4 font-bold text-lg transition-colors hover:opacity-90"
              style={{
                backgroundColor: 'var(--rk-colors-connectionIndicator)',
                color: '#000',
                borderRadius: 'var(--rk-radii-connectButton)',
                border: 'none',
                boxShadow: 'var(--rk-shadows-connectButton)'
              }}
            >
              Start Trading
            </button>
            <Link
              to="https://github.com/HackArchive/ouro-finance"
              target="_blank"
              className="px-8 py-4 font-bold text-lg transition-colors hover:opacity-80"
              style={{
                border: '2px solid var(--rk-colors-accentColor)',
                color: 'var(--rk-colors-accentColor)',
                borderRadius: 'var(--rk-radii-connectButton)',
                backgroundColor: 'transparent'
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Markets */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Markets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularMarkets.map((market) => (
            <div
              key={market.symbol}
              onClick={() => navigate(`/trade/${market.symbol}USD`)}
              className="rounded-lg p-6 cursor-pointer transition-colors hover:opacity-80"
              style={{
                backgroundColor: 'var(--rk-colors-actionButtonSecondaryBackground)',
                border: '1px solid var(--rk-colors-generalBorder)',
                borderRadius: 'var(--rk-radii-modal)'
              }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{market.symbol[0]}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{market.symbol}/USD</h3>
                  <p className="text-gray-400 text-sm">{market.name}</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-[#00ff88] mb-2">
                ${market.price.toLocaleString()}
              </div>
              <div className={`text-sm ${market.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                {market.change >= 0 ? "+" : ""}{market.change}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Ouro</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-[#00ff88]">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#00ff88]/10 to-[#00cc6a]/10 border-t border-[#00ff88]/20">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Trading?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of traders already using Ouro Finance to trade crypto derivatives
          </p>
          <button
            onClick={() => navigate("/trade/ALGOUSD")}
            className="bg-[#00ff88] hover:bg-[#00e67a] text-black px-8 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            Launch App
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#262626] border-t border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">O</span>
              </div>
              <span className="text-white text-xl font-bold">Ouro Finance</span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <Link to="/docs" className="hover:text-white transition-colors">Docs</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="https://github.com/HackArchive/ouro-finance" target="_blank" className="hover:text-white transition-colors">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}