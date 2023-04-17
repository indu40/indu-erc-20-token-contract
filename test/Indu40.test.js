/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { BN, expectRevert } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

const ERC20Mock = artifacts.require("Indu40Mock");

contract("Indu40", function (accounts) {
  const [initialHolder, recipient, anotherAccount] = accounts;

  const name = "indu4.0";
  const symbol = "INDU";
  const initialSupply = new BN("50000000000000000000000000");
  const initialConstructorSupply = 50000000;
  const cap = 750000000;

  beforeEach(async function () {
    this.token = await ERC20Mock.new(initialHolder, initialConstructorSupply, cap, { from: initialHolder });
  });

  it("has a name", async function () {
    expect(await this.token.name()).to.equal(name);
  });

  it("has a symbol", async function () {
    expect(await this.token.symbol()).to.equal(symbol);
  });

  it("has 18 decimals", async function () {
    expect(await this.token.decimals()).to.be.bignumber.equal("18");
  });

  it("has initial balance", async function () {
    expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal(
      initialSupply
    );
  });

  describe("mint and burn", function () {
    const amount = new BN("42");

    it("allows to mint by owner", async function () {
      await this.token.mint(recipient, amount);
      expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(
        amount
      );
    });

    it("mint not supported by not owner", async function () {
      await expectRevert(
        this.token.mint(recipient, amount, { from: anotherAccount }),
        "Ownable: caller is not the owner"
      );
    });

    it("allows to burn own tokens (owner)", async function () {
      await this.token.burn(amount);
      expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal(
        initialSupply.sub(amount)
      );
    });

    it("allows to burn own tokens (recipient)", async function () {
      await this.token.mint(recipient, amount);
      await this.token.burn(amount, { from: recipient });
      expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(
        new BN('0')
      );
    });

    it("burn not supported if amount exceeds balance", async function () {
      await expectRevert(
        this.token.burn(amount, { from: anotherAccount }),
        "ERC20: burn amount exceeds balance"
      );
    });
  });

  describe("check that methods not supported", function () {
    const amount = new BN("42");

    it('"pause" not supported', async function () {
      try {
        await this.token.pause();
        expect.fail("The transaction should have thrown an error");
      } catch (err) {
        expect(err.message).to.equal("this.token.pause is not a function");
      }
    });

    it('"unpause" not supported', async function () {
      try {
        await this.token.unpause();
        expect.fail("The transaction should have thrown an error");
      } catch (err) {
        expect(err.message).to.equal("this.token.unpause is not a function");
      }
    });

    it('"flash minting" not supported', async function () {
      try {
        await this.token.flashLoan(recipient, this.token.address, amount, "0x");
        expect.fail("The transaction should have thrown an error");
      } catch (err) {
        expect(err.message).to.equal("this.token.flashLoan is not a function");
      }
    });

    it('"snapshot" not supported', async function () {
      try {
        await this.token.snapshot();
        expect.fail("The transaction should have thrown an error");
      } catch (err) {
        expect(err.message).to.equal("this.token.snapshot is not a function");
      }
    });

    it('"timelock" not supported', async function () {
      try {
        await this.token.release();
        expect.fail("The transaction should have thrown an error");
      } catch (err) {
        expect(err.message).to.equal("this.token.release is not a function");
      }
    });

    it('"votes" not supported', async function () {
      try {
        await this.token.checkpoints(initialHolder, 0);
        expect.fail("The transaction should have thrown an error");
      } catch (err) {
        expect(err.message).to.equal(
          "this.token.checkpoints is not a function"
        );
      }

      try {
        await this.token.delegates(anotherAccount);
        expect.fail("The transaction should have thrown an error");
      } catch (err) {
        expect(err.message).to.equal("this.token.delegates is not a function");
      }

      try {
        await this.token.getVotes(anotherAccount);
        expect.fail("The transaction should have thrown an error");
      } catch (err) {
        expect(err.message).to.equal("this.token.getVotes is not a function");
      }
    });
  });
});
