import { ethers } from 'ethers';

import ERC20abi from '../ERC20.json';
import store from '../store';
import { closeModal } from '../features/modal/modalSlice';
import { useToast } from '../context/ToastContext';

export const getAllowance = async (
  tokenAddress: string,
  allower: string,
  spender: string,
  provider: ethers.providers.BaseProvider,
  dispatch: typeof store.dispatch,
) => {
  const { dispatch: toastDispatch } = useToast();
  const token = new ethers.Contract(tokenAddress, ERC20abi, provider);

  try {
    const res = await token.allowance(allower, spender);
    const allowance = ethers.utils.formatUnits(res);
    return { value: parseInt(allowance) };
  } catch (err: any) {
    console.log(err);
    const message = err.data ? err.data.message : err.message;
    toastDispatch({
      type: 'SET_TOAST',
      payload: {
        type: 'ERROR',
        message,
      },
    });

    dispatch(closeModal());
  }
};
