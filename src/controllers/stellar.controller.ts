import { Request, Response } from "express";
import { StellarService } from "../services/stellar.service";

const stellarService = new StellarService();

export class StellarController {
  static async getBalance(req: Request, res: Response) {
    try {
      const { publicKey, assetCode, assetIssuer } = req.query;
      const balance = await stellarService.getAssetBalance(
        publicKey as string,
        assetCode as string,
        assetIssuer as string
      );
      res.json({ balance });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
