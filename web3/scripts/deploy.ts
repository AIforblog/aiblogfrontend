// aiblogfrontend\web3\scripts\deploy.ts
import { artifacts } from "hardhat";
import hre from "hardhat";
import fs from "fs";
import "@nomicfoundation/hardhat-ethers";
import path from "path";

async function main() {
  try {
    // Get the deployer's balance first
    const [deployer] = await hre.ethers.getSigners();
    const balance = await deployer.provider.getBalance(deployer.address);

    console.log("Deploying contracts with account:", deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

    // Deploy with explicit gas limit and price to avoid overestimation
    const JobPlatform = await hre.ethers.getContractFactory("JobPlatform");
    const jobPlatform = await JobPlatform.deploy({
      gasLimit: 3000000, // Adjust this value based on actual needs
    });

    await jobPlatform.waitForDeployment();

    const address = await jobPlatform.getAddress();
    console.log(`JobPlatform deployed to: ${address}`);

    // Save deployment info
    const contractsDir = path.join(__dirname, "..", "contracts");
    const addressesDir = path.join(contractsDir, "addresses");
    const abisDir = path.join(contractsDir, "abis");

    fs.mkdirSync(addressesDir, { recursive: true });
    fs.mkdirSync(abisDir, { recursive: true });

    const network = await deployer.provider.getNetwork();
    // Convert chainId to number for comparison
    const chainId = Number(network.chainId);
    const networkName = chainId === 84532 ? "baseSepolia" : "base";

    const addressContent = `export const CONTRACT_ADDRESS = {
  ${networkName}: "${address}"
} as const;`;

    fs.writeFileSync(path.join(addressesDir, "index.ts"), addressContent);

    const artifact = await artifacts.readArtifact("JobPlatform");
    fs.writeFileSync(
      path.join(abisDir, "JobPlatform.json"),
      JSON.stringify(artifact.abi, null, 2)
    );

    console.log("Deployment successful! Contract information saved.");
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
