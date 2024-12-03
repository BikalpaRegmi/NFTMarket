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
        transaction = await contract.createToken("bks.png", ethers.parseEther('1'), 10);
        transaction = await contract.connect(addr1).createToken("addr1.png", ethers.parseEther('2'), 10);
        transaction = await contract.connect(addr2).createToken("addr2.png", ethers.parseEther('3'), 10);
        await transaction.wait();
    });

    describe("Getting Nfts", () => {
        it("Should provide one nft if asked", async () => {
            const res:any = await contract.getANft(0);
            expect(res.isListed).to.eq(true);
            expect(res.originalMinter).to.eq(owner);
            expect(res.currentBid).to.eq(ethers.parseEther("1"));
        });
        
        it("Should provide all the nfts when asked", async () => {
            const res: any = await contract.getAllListedNfts();
            expect(res[0].owner).to.eq(owner);
            expect(res[0].currentBid).to.eq(ethers.parseEther("1"));
            expect(res[1].owner).to.eq(addr1);
            expect(res[2].owner).to.eq(addr2);
        });

        it("Should provide all nft of individual owner", async () => {
            const res = await contract.connect(addr1).getMyNfts();
            expect(res[0].currentBid).to.eq(ethers.parseEther("2"));
        })
    })
});
