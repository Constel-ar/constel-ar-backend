import { Request, Response } from "express";
import { SorobanService } from "../services/soroban.service";

const sorobanService = new SorobanService();

export class SorobanController {
  static async getEvents(req: Request, res: Response) {
    try {
      const { contractId, startLedger, limit } = req.query;
      const events = await sorobanService.getContractEvents(
        contractId as string,
        Number(startLedger),
        limit ? Number(limit) : 10
      );
      res.json(events);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
