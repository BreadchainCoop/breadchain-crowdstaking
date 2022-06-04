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
  INIT = "INIT",
  LOADING = "LOADING",
  LOADED = "LOADED",
  REJECTED = "REJECTED",
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
  MATIC: {
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
  MATIC: {
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
    MATIC: {
      name: "MATIC",
      balance: tokens.MATIC.balance,
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
    MATIC: {
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
      state.tokens.MATIC.balance = action.payload;
      state.tokens.MATIC.status = EBalanceStatus.LOADED;
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
        MATIC: {
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
      state.tokens.MATIC.status = EBalanceStatus.LOADING;
    });
    builder.addCase(getBalances.fulfilled, (state, action) => {
      state.tokens.BREAD.status = EBalanceStatus.LOADED;
      state.tokens.DAI.status = EBalanceStatus.LOADED;
      state.tokens.MATIC.status = EBalanceStatus.LOADED;
      state.tokens.BREAD.balance = action.payload.BREAD.balance;
      state.tokens.DAI.balance = action.payload.DAI.balance;
      state.tokens.MATIC.balance = action.payload.MATIC.balance;
    });
    builder.addCase(getBalances.rejected, (state, action) => {
      state.tokens.BREAD.status = EBalanceStatus.REJECTED;
      state.tokens.DAI.status = EBalanceStatus.REJECTED;
      state.tokens.MATIC.status = EBalanceStatus.REJECTED;
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
