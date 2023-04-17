/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { BN, expectRevert } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

const ERC20Mock = artifacts.require("Indu40Mock");

contract("Indu40", function (accounts) {
  const [initialHolder, recipient] = accounts;

  const initialSupply = new BN("749999999000000000000000000");
  const initialConstructorSupply = 749999999;
  const capn = new BN("750000000000000000000000000");
  const cap = 750000000;

  beforeEach(async function () {
    this.token = await ERC20Mock.new(initialHolder, initialConstructorSupply, cap, { from: initialHolder });
  });

  describe("check minting cap", function () {
    const amountToCap = new BN("1000000000000000000");
    const amountToOverCap = new BN("1000000000000000001");

    it("allows to mint up to the cap", async function () {
      await this.token.mint(recipient, amountToCap);
      expect(await this.token.totalSupply()).to.be.bignumber.equal(
        capn
      );
    });

    it("mint over cap prohibited", async function () {
      await expectRevert(
        this.token.mint(recipient, amountToOverCap),
        "ERC20Capped: cap exceeded"
      );
    });

    it("mint to cap and over cap afterwards", async function () {
      await this.token.mint(recipient, amountToCap);
      await expectRevert(
        this.token.mint(recipient, amountToOverCap),
        "ERC20Capped: cap exceeded"
      );
      expect(await this.token.totalSupply()).to.be.bignumber.equal(
        capn
      );
    });

    it("get cap", async function () {
      expect(await this.token.cap()).to.be.bignumber.equal(
        capn
      );
    });
  });
});
