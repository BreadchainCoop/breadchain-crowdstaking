import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';

export type TToastType = 'INFO' | 'ERROR' | 'SUCCESS';

export type TToastState = null | {
  type: TToastType;
  message: string;
};

export type TToastAction =
  | {
      type: 'SET_TOAST';
      payload: {
        type: TToastType;
        message: string;
      };
    }
  | {
      type: 'CLEAR_TOAST';
    };

/* eslint-disable-next-line no-unused-vars */
export type TToastDispatch = (action: TToastAction) => void;

const ToastContext = createContext<
  | {
      state: TToastState;
      dispatch: TToastDispatch;
    }
  | undefined
>(undefined);

const toastReducer = (state: TToastState, action: TToastAction) => {
  const { type: actionType } = action;
  switch (actionType) {
    case 'SET_TOAST':
      /* eslint-disable-next-line no-case-declarations */
      const {
        payload: { type: toastType, message },
      } = action;
      return {
        type: toastType,
        message,
      };
    case 'CLEAR_TOAST':
      return null;
    default:
      return state;
  }
};

interface IToastProviderProps {
  children: ReactNode;
}

function ToastProvider({ children }: IToastProviderProps) {
  const [state, dispatch] = useReducer(toastReducer, null);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export { ToastProvider, useToast };
