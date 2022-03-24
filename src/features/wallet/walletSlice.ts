import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getBalances as APIGetBalances } from "../../api";
import TokenDisplay from "../../components/Swap/TokenDisplay";
import { RootState } from "../../store";
import { ENetwork } from "../network/networkSlice";

export enum EWalletConnectionState {
  NOT_CONNECTED = "NOT_CONNECTED",
  CONNECTED = "CONNECTED",
  CONNECTING = "CONNECTING",
}

export enum EBalanceStatus {
  INIT,
  LOADING,
  LOADED,
}

export type TTokens = {
  [key: string]: { status: EBalanceStatus; balance: string };
  BREAD: {
    status: EBalanceStatus;
    balance: string;
  };
  DAI: {
    status: EBalanceStatus;
    balance: string;
  };
  ETH: {
    status: EBalanceStatus;
    balance: string;
  };
};

export interface IWalletState {
  connected: EWalletConnectionState;
  address: null | string;
  tokens: TTokens;
}

type TBalanceData = {
  BREAD: {
    name: string;
    balance: string;
  };
  DAI: {
    name: string;
    balance: string;
  };
  ETH: {
    name: string;
    balance: string;
  };
};

export const getBalances = createAsyncThunk<
  TBalanceData,
  {},
  { state: RootState }
>("wallet/getBalances", async (_, { getState }): Promise<TBalanceData> => {
  const {
    wallet: { address },
    network: { network },
  } = getState();
  if (!address || !network) {
    throw new Error("no address / network!");
  }
  const res = await APIGetBalances(address, network);
  if (!res) {
    // !!! handle this error
    throw new Error("Failed to get balances!");
  }
  const { tokens } = res;

  return {
    BREAD: {
      name: "BREAD",
      balance: tokens.BREAD.balance,
    },
    DAI: {
      name: "DAI",
      balance: tokens.DAI.balance,
    },
    ETH: {
      name: "ETH",
      balance: tokens.ETH.balance,
    },
  };
});

const initialState: IWalletState = {
  connected: EWalletConnectionState.NOT_CONNECTED,
  address: null,
  tokens: {
    BREAD: {
      status: EBalanceStatus.INIT,
      balance: "",
    },
    DAI: {
      status: EBalanceStatus.INIT,
      balance: "",
    },
    ETH: {
      status: EBalanceStatus.INIT,
      balance: "",
    },
  },
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    setBREADBalance(state, action: PayloadAction<string>) {
      state.tokens.BREAD.balance = action.payload;
      state.tokens.BREAD.status = EBalanceStatus.LOADED;
    },
    setDAIBalance(state, action: PayloadAction<string>) {
      state.tokens.DAI.balance = action.payload;
      state.tokens.DAI.status = EBalanceStatus.LOADED;
    },
    setETHBalance(state, action: PayloadAction<string>) {
      state.tokens.ETH.balance = action.payload;
      state.tokens.ETH.status = EBalanceStatus.LOADED;
    },
    clearBalances(state) {
      state.tokens = {
        BREAD: {
          status: EBalanceStatus.INIT,
          balance: "",
        },
        DAI: {
          status: EBalanceStatus.INIT,
          balance: "",
        },
        ETH: {
          status: EBalanceStatus.INIT,
          balance: "",
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBalances.pending, (state, action) => {
      state.tokens.BREAD.status = EBalanceStatus.LOADING;
      state.tokens.DAI.status = EBalanceStatus.LOADING;
      state.tokens.ETH.status = EBalanceStatus.LOADING;
    });
    builder.addCase(getBalances.fulfilled, (state, action) => {
      state.tokens.BREAD.status = EBalanceStatus.LOADED;
      state.tokens.DAI.status = EBalanceStatus.LOADED;
      state.tokens.ETH.status = EBalanceStatus.LOADED;
      state.tokens.BREAD.balance = action.payload.BREAD.balance;
      state.tokens.DAI.balance = action.payload.DAI.balance;
      state.tokens.ETH.balance = action.payload.ETH.balance;
    });
    builder.addCase(getBalances.rejected, (state, action) => {
      console.log("getBalances rejected: ", action);
    });
  },
});

export default walletSlice.reducer;
export const {
  setWalletAddress,
  setBREADBalance,
  setDAIBalance,
  setETHBalance,
  clearBalances,
} = walletSlice.actions;
