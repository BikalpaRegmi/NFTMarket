import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { NFTMARKETPLACE } from "../typechain-types";

describe("NFTMARKET", () => {
    let addr1: Signer, addr2: Signer, addr3: Signer, owner: Signer, contract: NFTMARKETPLACE , transaction:any;

    beforeEach(async () => {
        const contractFactory: any = await ethers.getContractFactory(
            "NFTMARKETPLACE"
        );
        [owner, addr1, addr2, addr3] = await ethers.getSigners();
        contract = await contractFactory.deploy();
        transaction = await contract.createNftListing(
          ethers.parseEther("1"),
          10,
          "bks.png",
          { value: ethers.parseEther("0.001") }
        );
        transaction = await contract
          .connect(addr1)
          .createNftListing(ethers.parseEther("2"), 5, "addr1.png", {
            value: ethers.parseEther("0.001"),
          });
        transaction = await contract
          .connect(addr2)
          .createNftListing(ethers.parseEther("3"), 9, "addr2.png", {
            value: ethers.parseEther("0.001"),
          });
        await transaction.wait();
    });

    describe("Getting Nfts", () => {
        it("Should provide one nft if asked", async () => {
            const res: any = await contract.getANft(0);
            expect(res.isListed).to.eq(true);
            expect(res.minter).to.eq(owner);
            expect(res.currentPrice).to.eq(ethers.parseEther("1"));
        });
        
        it("Should provide all the nfts when asked", async () => {
            const res: any = await contract.getAllListedNfts();
            expect(res[0].owner).to.eq(owner);
            expect(res[0].currentPrice).to.eq(ethers.parseEther("1"));
            expect(res[1].owner).to.eq(addr1);
            expect(res[2].owner).to.eq(addr2);
        });

        it("Should provide all nft of individual owner", async () => {
            const res = await contract.connect(addr1).getAllListedNfts();
            const addr1Address: string = await addr1.getAddress();
               const newRes = res.filter((curval: any) => curval.owner.toLowerCase() === addr1Address.toLowerCase());
            expect(newRes[0].currentPrice).to.eq(ethers.parseEther("2"));
        });
    });

    describe("Participate & Relist", () => {
        it("Should revert if paid lesser than starting or latest price", async () => {
            await expect(
                contract.participateBidding(0, {
                    value: ethers.parseEther("0.9"),
                })
            ).to.be.revertedWith("U Must Pay Greater Than Previous Bid");
        });

        it("Should participate on bidding when called", async () => {
            await contract.connect(addr1).participateBidding(0, { value: ethers.parseEther("1.1") });
            const res: any = await contract.getANft(0);
            expect(res.currentPrice).to.eq(ethers.parseEther("1.1"));
            expect(res.highestBidder).to.eq(addr1);
            expect(res.owner).to.eq(owner);
        });

        it("Should assing the right owner if bidding is finalize", async () => {
await contract
  .connect(addr1)
    .participateBidding(2, { value: ethers.parseEther("3.1") });
            const oldRes: any = await contract.getANft(2);
            expect(oldRes.highestBidder).to.eq(addr1);
            await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]);
            await contract.finalizeBidding(2);
            const res: any = await contract.getANft(2);
                        expect(res.owner).to.eq(addr1);
        })
    })
}); 
