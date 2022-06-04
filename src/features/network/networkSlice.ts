import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ENetworkConnectionState {
  NOT_CONNECTED = "NOT_CONNECTED",
  CONNECTED = "CONNECTED",
  CONNECTING = "CONNECTING",
}

export enum ENetwork {
  MAINNET = "MAINNET",
  POLYGON = "POLYGON",
  RINKEBY = "RINKEBY",
  UNSUPPORTED = "UNSUPPORTED",
}

export type TXR = {
  USD: null | number;
  EUR: null | number;
  GBP: null | number;
};

interface NetworkState {
  connected: ENetworkConnectionState;
  network: null | ENetwork;
  gasPrice: null | string;
  xr: TXR;
}

const initialState: NetworkState = {
  connected: ENetworkConnectionState.NOT_CONNECTED,
  network: null,
  gasPrice: null,
  xr: { USD: null, EUR: null, GBP: null },
};

const NetworkSlice = createSlice({
  name: "Network",
  initialState,
  reducers: {
    setNetwork(state, action: PayloadAction<ENetwork>) {
      state.network = action.payload;
    },
    setGasPrice(state, action: PayloadAction<string>) {
      state.gasPrice = action.payload;
    },
    setNetworkConnected(state, action: PayloadAction<ENetworkConnectionState>) {
      state.connected = action.payload;
    },
    setXr(state, action: PayloadAction<TXR>) {
      state.xr = action.payload;
    },
  },
});

export default NetworkSlice.reducer;
export const { setNetwork, setGasPrice, setNetworkConnected, setXr } =
  NetworkSlice.actions;
