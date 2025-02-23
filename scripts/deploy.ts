import { ethers } from "hardhat";

async function main() {
  const MusicPlatform = await ethers.getContractFactory("MusicPlatform");
  const musicPlatform = await MusicPlatform.deploy();

  await musicPlatform.waitForDeployment();

  console.log("MusicPlatform deployed to:", await musicPlatform.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
