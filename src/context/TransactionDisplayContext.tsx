import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';

export type TTransactionStatus = 'PENDING' | 'COMPLETE';

export interface ITransaction {
  status: TTransactionStatus;
  hash: `0x${string}`;
}

export type TTransactionDisplayState = null | ITransaction;

export type TTransactionDisplayAction =
  | {
      type: 'SET_PENDING';
      payload: ITransaction;
    }
  | {
      type: 'SET_COMPLETE';
    }
  | {
      type: 'CLEAR';
    };

/* eslint-disable-next-line no-unused-vars */
export type TTransactionDisplayDispatch = (
  action: TTransactionDisplayAction,
) => void;

const TransactionDisplayContext = createContext<
  | {
      state: TTransactionDisplayState;
      dispatch: TTransactionDisplayDispatch;
    }
  | undefined
>(undefined);

function TransactionDisplayReducer(
  state: TTransactionDisplayState,
  action: TTransactionDisplayAction,
): TTransactionDisplayState {
  const { type: actionType } = action;
  switch (actionType) {
    case 'SET_PENDING':
      /* eslint-disable-next-line no-case-declarations */
      const {
        payload: { status, hash },
      } = action;
      return {
        status,
        hash,
      };
    case 'SET_COMPLETE':
      if (state === null) throw new Error('TransactionDisplay currently null');
      return {
        ...state,
        status: 'COMPLETE',
      };
    case 'CLEAR':
      return null;
    default:
      throw new Error('TransactionDisplay action not recognised');
  }
}

interface ITransactionDisplayProviderProps {
  children: ReactNode;
}

function TransactionDisplayProvider({
  children,
}: ITransactionDisplayProviderProps) {
  const [state, dispatch] = useReducer(TransactionDisplayReducer, null);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <TransactionDisplayContext.Provider value={value}>
      {children}
    </TransactionDisplayContext.Provider>
  );
}

const useTransactionDisplay = () => {
  const context = useContext(TransactionDisplayContext);
  if (context === undefined) {
    throw new Error(
      'useTransactionDisplay must be used within a TransactionDisplayProvider',
    );
  }
  return context;
};

export { TransactionDisplayProvider, useTransactionDisplay };
