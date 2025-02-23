const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Starting deployment...");

  try {
    const MusicPlatform = await hre.ethers.getContractFactory("MusicPlatform");
    console.log("Deploying MusicPlatform contract...");

    const musicPlatform = await MusicPlatform.deploy();
    await musicPlatform.waitForDeployment();

    const contractAddress = await musicPlatform.getAddress();
    console.log("MusicPlatform deployed to:", contractAddress);

    // Save the contract address to a file that the frontend can read
    const envContent = `VITE_CONTRACT_ADDRESS=${contractAddress}\n`;
    fs.writeFileSync(path.join(__dirname, "../.env.local"), envContent);

    console.log("Contract address saved to .env.local");
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
