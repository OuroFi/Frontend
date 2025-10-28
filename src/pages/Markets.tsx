import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSymbolPrice } from "../utils/GetSymbolPrice";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
  sparklineData: number[];
  category: string;
}

const initialMarkets: Omit<MarketData, 'price'>[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    change24h: -3.83,
    icon: "⟠",
    sparklineData: [4200, 4150, 4100, 4050, 4000, 4020, 4071],
    category: "L1/L2"
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    change24h: -1.65,
    icon: "₿",
    sparklineData: [115000, 114500, 114000, 113800, 113500, 113600, 113651],
    category: "L1/L2"
  },
  {
    symbol: "SOL",
    name: "Solana",
    change24h: -2.67,
    icon: "◎",
    sparklineData: [205, 203, 201, 199, 197, 198, 198.86],
    category: "L1/L2"
  },
  {
    symbol: "ALGO",
    name: "Algorand",
    change24h: 1.24,
    icon: "🔺",
    sparklineData: [0.35, 0.34, 0.36, 0.37, 0.35, 0.36, 0.35],
    category: "L1/L2"
  }
];

const categories = ["All", "AI", "Meme", "L1/L2", "Forex", "Metals"];

const MiniChart = ({ data, isPositive }: { data: number[], isPositive: boolean }) => {
  const width = 100;
  const height = 40;
  const padding = 5;

  if (!data || data.length < 2) return <div className="w-[100px] h-[40px]" />;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
    const y = padding + ((max - value) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? 'var(--rk-colors-connectionIndicator)' : 'var(--rk-colors-error)'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function Markets() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [filteredMarkets, setFilteredMarkets] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const marketsWithPrices = await Promise.all(
          initialMarkets.map(async (market) => {
            try {
              const price = await getSymbolPrice(`${market.symbol}USD`);
              return { ...market, price };
            } catch (error) {
              console.error(`Failed to fetch price for ${market.symbol}:`, error);
              return { ...market, price: 0 };
            }
          })
        );
        setMarkets(marketsWithPrices);
      } catch (error) {
        console.error("Error fetching market prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();

    // Refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredMarkets(markets);
    } else {
      setFilteredMarkets(markets.filter(market => market.category === selectedCategory));
    }
  }, [selectedCategory, markets]);

  const handleMarketClick = (symbol: string) => {
    navigate(`/trade/${symbol}USD`);
  };

  return (
    <div className="min-h-screen pt-20" style={{
      backgroundColor: 'var(--rk-colors-modalBackground)',
      color: 'var(--rk-colors-modalText)'
    }}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover</h1>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="flex items-center space-x-1">
            <span className="text-lg">⭐</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'text-white'
                  : 'hover:opacity-80'
              }`}
              style={{
                color: selectedCategory === category
                  ? 'var(--rk-colors-modalText)'
                  : 'var(--rk-colors-modalTextSecondary)',
                backgroundColor: selectedCategory === category
                  ? 'var(--rk-colors-actionButtonSecondaryBackground)'
                  : 'transparent'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Market Table */}
        <div className="rounded-lg overflow-hidden" style={{
          backgroundColor: 'var(--rk-colors-modalBackground)',
          border: '1px solid var(--rk-colors-generalBorder)'
        }}>
          {/* Table Header */}
          <div className="grid grid-cols-4 px-6 py-4 border-b" style={{
            borderColor: 'var(--rk-colors-generalBorder)'
          }}>
            <div className="text-sm font-medium" style={{
              color: 'var(--rk-colors-modalTextSecondary)'
            }}>
              Market
            </div>
            <div className="text-sm font-medium text-right" style={{
              color: 'var(--rk-colors-modalTextSecondary)'
            }}>
              Price
            </div>
            <div className="text-sm font-medium text-right" style={{
              color: 'var(--rk-colors-modalTextSecondary)'
            }}>
              24h Change
            </div>
            <div className="text-sm font-medium text-right" style={{
              color: 'var(--rk-colors-modalTextSecondary)'
            }}>
              Last 24h
            </div>
          </div>

          {/* Market Rows */}
          <div>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-lg" style={{ color: 'var(--rk-colors-modalTextSecondary)' }}>
                  Loading market data...
                </div>
              </div>
            ) : filteredMarkets.map((market) => (
              <div
                key={market.symbol}
                onClick={() => handleMarketClick(market.symbol)}
                className="grid grid-cols-4 px-6 py-4 cursor-pointer transition-colors hover:opacity-80 border-b"
                style={{
                  borderColor: 'var(--rk-colors-generalBorderDim)'
                }}
              >
                {/* Market Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{
                    backgroundColor: 'var(--rk-colors-actionButtonSecondaryBackground)'
                  }}>
                    {market.icon}
                  </div>
                  <div>
                    <div className="font-semibold" style={{
                      color: 'var(--rk-colors-modalText)'
                    }}>
                      {market.symbol}
                    </div>
                    <div className="text-sm" style={{
                      color: 'var(--rk-colors-modalTextSecondary)'
                    }}>
                      {market.name}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right font-medium" style={{
                  color: 'var(--rk-colors-modalText)'
                }}>
                  ${market.price.toLocaleString(undefined, {
                    minimumFractionDigits: market.price < 1 ? 6 : 2,
                    maximumFractionDigits: market.price < 1 ? 8 : 2
                  })}
                </div>

                {/* 24h Change */}
                <div className="text-right font-medium" style={{
                  color: market.change24h >= 0
                    ? 'var(--rk-colors-connectionIndicator)'
                    : 'var(--rk-colors-error)'
                }}>
                  {market.change24h >= 0 ? '+' : ''}{market.change24h.toFixed(2)}%
                </div>

                {/* Mini Chart */}
                <div className="flex justify-end">
                  <MiniChart
                    data={market.sparklineData}
                    isPositive={market.change24h >= 0}
                  />
                </div>
              </div>
            ))}
            {!loading && filteredMarkets.length === 0 && (
              <div className="flex justify-center items-center py-12">
                <div className="text-lg" style={{ color: 'var(--rk-colors-modalTextSecondary)' }}>
                  No markets found for this category
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm" style={{
            color: 'var(--rk-colors-modalTextSecondary)'
          }}>
            Real-time market data • Updated every second
          </p>
        </div>
      </div>
    </div>
  );
}