import { Server, Asset, Networks, Horizon } from "stellar-sdk";

export class StellarService {
  private server: Server;
  private network: Networks;

  private readonly USDC_CODE = "USDC";
  private readonly USDC_ISSUER = "<ISSUER_PUBLIC_KEY>";
  private readonly ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

  constructor() {
    this.server = new Server("https://horizon.stellar.org");
    this.network = Networks.PUBLIC;
  }

  async getAssetBalance(publicKey: string, assetCode?: string, assetIssuer?: string): Promise<string> {
    this.validatePublicKey(publicKey, "Invalid public key received");

    const account = await this.getAccount(publicKey);

    if (this.network === Networks.PUBLIC) {
      const balance = account.balances.find(
        (b) =>
          b.asset_type === "credit_alphanum4" &&
          b.asset_code === this.USDC_CODE &&
          b.asset_issuer === this.USDC_ISSUER
      );
      return balance?.balance || "0.00";
    }

    if (!assetCode || !assetIssuer) {
      throw new Error("Asset code and asset issuer are required");
    }

    const asset = this.validateAsset(assetCode, assetIssuer);

    const balance = account.balances.find(
      (b) =>
        (b.asset_type === "credit_alphanum4" || b.asset_type === "credit_alphanum12") &&
        b.asset_code === asset.code &&
        b.asset_issuer === asset.issuer
    );

    return balance?.balance || "0.00";
  }

  private async getAccount(address: string): Promise<Horizon.AccountResponse> {
    try {
      return await this.server.loadAccount(address);
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error("Account not found");
      }
      throw new Error("Error getting account");
    }
  }

  private validateAsset(assetCode: string, assetIssuer: string): Asset {
    if (assetCode.length < 1 || assetCode.length > 12 || !this.ALPHANUMERIC_REGEX.test(assetCode)) {
      throw new Error("Asset code must be 1-12 alphanumeric characters");
    }
    this.validatePublicKey(assetIssuer, "Asset issuer must be a valid public key");
    return new Asset(assetCode, assetIssuer);
  }

  private validatePublicKey(publicKey: string, message: string) {
    if (!/G[A-Z0-9]{55}/.test(publicKey)) throw new Error(message);
  }
}
