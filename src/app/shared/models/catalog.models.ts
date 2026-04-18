export interface Player {
  id: number;
  name: string;
  balance: number;
}

export interface AuctionLot {
  id: number;
  name: string;
  initialBid: number;
  status: string;
}
