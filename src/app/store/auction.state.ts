export interface AuctionState {
  price: number;
  lastBidder: string;
  timeLeft: number;
  status: 'ACTIVE' | 'FINISHED';
}