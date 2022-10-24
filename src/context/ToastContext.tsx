import { createContext, useContext, useReducer } from 'react';

export type TToastType = 'INFO' | 'ERROR' | 'SUCCESS';

export type TToast = null | {
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

export type TToastDispatch = (action: TToastAction) => void;

const ToastContext = createContext<
  | {
      state: TToast | null;
      dispatch: TToastDispatch;
    }
  | undefined
>(undefined);

const toastReducer = (state: TToast, action: TToastAction) => {
  const { type: actionType } = action;
  switch (actionType) {
    case 'SET_TOAST':
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
  children: React.ReactNode;
}

function ToastProvider({ children }: IToastProviderProps) {
  const [state, dispatch] = useReducer(toastReducer, null);

  const value = { state, dispatch };

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
