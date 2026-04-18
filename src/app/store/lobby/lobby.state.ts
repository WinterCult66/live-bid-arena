import { AuctionLot, Player } from '../../shared/models/catalog.models';

export interface LobbyState {
  loading: boolean;
  error: string | null;
  players: Player[];
  auctions: AuctionLot[];
  currentPlayer: Player | null;
}

export const initialLobbyState: LobbyState = {
  loading: false,
  error: null,
  players: [],
  auctions: [],
  currentPlayer: null,
};
