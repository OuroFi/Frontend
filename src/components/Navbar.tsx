import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Symbols } from "../types";

export default function Navbar() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const connect = () => {
    // Placeholder for Algorand wallet connection
    setIsConnected(true);
    setAccount("ALGO...4x2p");
  };

  const disconnect = () => {
    setIsConnected(false);
    setAccount("");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50" style={{
      backgroundColor: 'var(--rk-colors-modalBackground)',
      borderBottom: '1px solid var(--rk-colors-generalBorder)'
    }}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo and brand */}
        <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Ouro Logo" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold" style={{
            color: 'var(--rk-colors-modalText)'
          }}>Ouro</span>
        </Link>

        {/* Navigation menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link
            to="/markets"
            className={`transition-colors hover:opacity-80 ${location.pathname === '/markets' ? 'pb-1 border-b-2' : ''}`}
            style={{
              color: location.pathname === '/markets'
                ? 'var(--rk-colors-modalText)'
                : 'var(--rk-colors-modalTextSecondary)',
              borderBottomColor: location.pathname === '/markets'
                ? 'var(--rk-colors-accentColor)'
                : 'transparent'
            }}
          >
            Markets
          </Link>
          <Link
            to="/trade/ALGOUSD"
            className={`transition-colors hover:opacity-80 ${location.pathname.startsWith('/trade') ? 'pb-1 border-b-2' : ''}`}
            style={{
              color: location.pathname.startsWith('/trade')
                ? 'var(--rk-colors-modalText)'
                : 'var(--rk-colors-modalTextSecondary)',
              borderBottomColor: location.pathname.startsWith('/trade')
                ? 'var(--rk-colors-accentColor)'
                : 'transparent'
            }}
          >
            Trade
          </Link>
          <Link to="/rewards" className="transition-colors hover:opacity-80" style={{
            color: 'var(--rk-colors-modalTextSecondary)'
          }}>
            Rewards
          </Link>
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
              <span>Earn</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-48 bg-[#262626] border border-gray-700 rounded-lg shadow-lg">
              <MenuItem>
                <Link to="/earn/staking" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg">
                  Staking
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/earn/liquidity" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg">
                  Liquidity Mining
                </Link>
              </MenuItem>
            </MenuItems>
          </Menu>
          <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
            Profile
          </Link>
        </div>

        {/* Right side - Wallet connection */}
        <div className="flex items-center space-x-4">
          {!isConnected ? (
            <button
              onClick={connect}
              className="px-6 py-2 font-semibold transition-colors hover:opacity-90"
              style={{
                backgroundColor: 'var(--rk-colors-connectionIndicator)',
                color: '#000',
                borderRadius: 'var(--rk-radii-connectButton)',
                border: 'none',
                boxShadow: 'var(--rk-shadows-connectButton)'
              }}
            >
              Sign Up
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="rounded-lg px-4 py-2" style={{
                backgroundColor: 'var(--rk-colors-actionButtonSecondaryBackground)',
                borderRadius: 'var(--rk-radii-connectButton)'
              }}>
                <span className="font-mono text-sm" style={{
                  color: 'var(--rk-colors-modalText)'
                }}>{account}</span>
              </div>
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:opacity-80" style={{
                  backgroundColor: 'var(--rk-colors-actionButtonSecondaryBackground)',
                  borderRadius: 'var(--rk-radii-connectButton)'
                }}>
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-48 bg-[#262626] border border-gray-700 rounded-lg shadow-lg">
                  <MenuItem>
                    <Link to="/profile" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg">
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={disconnect}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                    >
                      Disconnect
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
