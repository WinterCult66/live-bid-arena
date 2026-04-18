import { AuctionState } from './auction/auction.state';
import { LobbyState } from './lobby/lobby.state';

export interface AppState {
  lobby: LobbyState;
  auction: AuctionState;
}
