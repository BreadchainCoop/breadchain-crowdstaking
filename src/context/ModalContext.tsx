import {
  createContext, ReactNode, useContext, useMemo, useReducer,
} from 'react';

export type TModalType =
  'CONNECT_WALLET' |
  'CHANGE_NETWORK' |
  'CHANGING_NETWORK' |
  'APPROVAL' |
  'BAKING' |
  'BURNING'

export type TModalStatus = 'LOCKED' | 'UNLOCKED'

export type TModalState = null | {
  type: TModalType;
  status: TModalStatus;
  title: string;
}

export type TModalAction =
  | {
    type: 'SET_MODAL';
    payload: {
      type: TModalType;
      title: string;
    };
  } | {
    type: 'UNLOCK_MODAL'
  }
  | {
    type: 'CLEAR_MODAL';
  };

/* eslint-disable-next-line no-unused-vars */
export type TModalDispatch = (action: TModalAction) => void;

const ModalContext = createContext<
  | {
    state: TModalState;
    dispatch: TModalDispatch;
  }
  | undefined
>(undefined);

const modalReducer = (state: TModalState, action: TModalAction): TModalState => {
  const { type: actionType } = action;
  switch (actionType) {
    case 'SET_MODAL':
      /* eslint-disable-next-line no-case-declarations */
      const {
        payload: { type, title },
      } = action;
      return {
        type,
        title,
        status: 'LOCKED',
      };
    case 'UNLOCK_MODAL':
      if (state === null) throw new Error('modal not set');
      if (state.type !== 'BAKING' && state.type !== 'BURNING') throw new Error('modal type cannot be unlocked');
      return {
        ...state,
        status: 'UNLOCKED',
      };
    case 'CLEAR_MODAL':
      if (state === null) throw new Error('modal not set');
      return null;
    default:
      return state;
  }
};

interface IModalProviderProps {
  children: ReactNode;
}

function ModalProvider({ children }: IModalProviderProps) {
  const [state, dispatch] = useReducer(modalReducer, null);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export { ModalProvider, useModal };
