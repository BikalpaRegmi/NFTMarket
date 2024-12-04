import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTMARKETPLACE = buildModule("NFTMARKETPLACE_Module", (m) => {
  const toDeploy = m.contract("NFTMARKETPLACE");
  return { toDeploy };
});

export default NFTMARKETPLACE;