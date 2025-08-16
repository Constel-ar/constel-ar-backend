import { rpc, scValToNative, xdr, nativeToScVal } from "@stellar/stellar-sdk";
import { EventResponse, EncodeEvent } from "../types/soroban";

export class SorobanService {
  private server: rpc.Server;

  constructor() {
    this.server = new rpc.Server("https://rpc-futurenet.stellar.org"); // o mainnet RPC
  }

  async getContractEvents(contractId: string, startLedger: number, limit = 10): Promise<EventResponse[]> {
    const response = await this.server.getEvents({
      startLedger,
      filters: [{ type: "contract", contractIds: [contractId] }],
      limit,
    });

    return this.encodeEventToDisplayEvent(response.events as EncodeEvent[]);
  }

  encodeEventToDisplayEvent(events: EncodeEvent[]): EventResponse[] {
    return events.map((event) => ({
      type: event.type,
      ledger: event.ledger,
      ledgerClosedAt: event.ledgerClosedAt,
      id: event.id,
      pagingToken: event.pagingToken,
      topic: event.topic.map((topic) => scValToNative(topic)),
      value: this.fromScValToDisplayValue(event.value),
      inSuccessfulContractCall: event.inSuccessfulContractCall,
      contractId: event.contractId?.contractId(),
    }));
  }

  fromScValToDisplayValue(value: xdr.ScVal) {
    switch (value.switch().name) {
      case "SCV_STRING":
      case "SCV_ADDRESS":
      case "SCV_BOOL":
        return scValToNative(value);
      case "SCV_I128":
        return Number(scValToNative(value));
      default:
        return value.value();
    }
  }

  toScVal(param: { value: any; type: string }) {
    return nativeToScVal(param.value, { type: param.type });
  }
}
