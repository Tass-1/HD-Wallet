import React, { useState, useEffect } from "react";
import { generateMnemonic } from "bip39";
import { EthWallet } from "./eth";
import { SolanaWallet } from "./sol";

const App = () => {
  // State values
  const [selectedBlockchain, setSelectedBlockchain] = useState("Ethereum");
  const [mnemonic, setMnemonic] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  // All blockchains in dropdown menu
  const blockchains = ["Ethereum", "Solana"];

  // Apply dark mode class by default
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Generating mnemonic phrase
  const handleGenerateMnemonic = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
  };

  const handleBlockchainChange = (e) => {
    setSelectedBlockchain(e.target.value);
  };

  const handleMnemonicChange = (e) => {
    setMnemonic(e.target.value);
  };

  // Creating matrix of mnemonic words
  const getFormattedMnemonic = () => {
    if (!mnemonic) return [];
    return mnemonic.split(" ").reduce((acc, word, idx) => {
      const row = Math.floor(idx / 4);
      acc[row] = acc[row] || [];
      acc[row].push(word);
      return acc;
    }, []);
  };

  // Copy mnemonic to clipboard and show success message for 2 seconds
  const handleCopyMnemonic = () => {
    navigator.clipboard.writeText(mnemonic).then(
      () => {
        setCopySuccess("Seed phrase copied to clipboard!");
        // Hide the message after 2 seconds
        setTimeout(() => setCopySuccess(""), 2000);
      },
      () => {
        setCopySuccess("Failed to copy seed phrase.");
        // Hide the message after 2 seconds
        setTimeout(() => setCopySuccess(""), 2000);
      }
    );
  };

  // Toggle between dark mode and light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`wallet-app min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-100"} transition-all duration-300`}
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <header className="flex justify-between items-center p-4">
      
  {/* KeySafe Logo with a Key + Shield SVG */}
        <header className="flex justify-between items-center p-4">
  
</header>
        {/* Dropdown + Toggle dark/light mode button */}
        <div className="flex items-center space-x-4">
          {/* Dropdown containing list of blockchains */}
          <select
            className="bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-gray-700 w-32 shadow-md"
            value={selectedBlockchain}
            onChange={handleBlockchainChange}
          >
            {blockchains.map((chain) => (
              <option key={chain} value={chain}>
                {chain}
              </option>
            ))}
          </select>

          {/* Dark Mode Toggle Button */}
          <div className="flex items-center space-x-3">
            {/* Sun icon (for light mode) */}
            {!darkMode && (
              <span role="img" aria-label="Sun" className="text-yellow-500">
                ☀️
              </span>
            )}

            {/* Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-all duration-300 focus:outline-none shadow-inner"
              aria-label="Toggle dark/light mode"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-300 transform ${
                  darkMode ? "translate-x-6 bg-yellow-500" : "bg-gray-900"
                }`}
              />
            </button>

            {/* Moon icon (for dark mode) */}
            {darkMode && (
              <span role="img" aria-label="Moon" className="text-gray-300">
                🌙
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {/* Seed Phrase Input and Generate Button */}
        <div className="mb-8">
          <label className="block mb-4 text-xl text-gray-800 dark:text-gray-300">Mnemonic key Phrase:</label>
          <div className="flex justify-center items-center">
            <textarea
              className="w-full p-4 text-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none"
              value={mnemonic}
              onChange={handleMnemonicChange}
              placeholder="Enter your own seed phrase or generate one (leave empty)"
              rows="3"
            />
            <button
               className="bg-purple-800 text-white px-6 py-3 rounded-lg shadow-lg ml-4 transition-all duration-300 border-2 border-transparent hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/50 hover:dark:shadow-purple-800/50"
              onClick={handleGenerateMnemonic}>
                    
              Generate Seed Phrase
            </button>
          </div>
        </div>

        {/* Copy Seed Phrase Button */}
        {mnemonic && (
          <div className="flex justify-end mb-6">
            <button
              onClick={handleCopyMnemonic}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
            >
              Copy Seed Phrase
            </button>
          </div>
        )}

        {/* Display Mnemonic Words */}
        {mnemonic && (
          <>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {getFormattedMnemonic().map((row, rowIndex) =>
                row.map((word, wordIndex) => (
                  <span
                    key={rowIndex * 4 + wordIndex}
                    className="mnemonic-word bg-white dark:bg-gray-900 p-3 rounded-lg text-center text-lg text-gray-800 dark:text-gray-300"
                  >
                    {word}
                  </span>
                ))
              )}
            </div>

            {/* Wallet Components */}
            <div className="mb-16">
              {selectedBlockchain === "Ethereum" && <EthWallet mnemonic={mnemonic} />}
              {selectedBlockchain === "Solana" && <SolanaWallet mnemonic={mnemonic} />}
            </div>
          </>
        )}

        {/* Copy Success Message */}
        {copySuccess && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">{copySuccess}</p>
        )}
      </main>
    
      {/* footer goes here */}
      <footer className="bg-gray-100 dark:bg-gray-900 text-center py-4 fixed bottom-0 ml-25">
  <p className="text-gray-800 dark:text-gray-400">
            FOR PROJECT EXHIBITION
    
  </p>
</footer>

    </div>
  );
};

export default App;
