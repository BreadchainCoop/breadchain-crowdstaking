import { UseTokenBalanceResult } from '../../hooks/useTokenBalance';
import TokenBalance from '../TokenBalance';
import Icon from './Icon';
import {
  PanelBalance,
  PanelContainer, PanelContent, PanelHeader,
} from './TokenDisplay';

interface IProps {
  inputValue: string
  balanceReadings: UseTokenBalanceResult,
  tokenType: 'DAI' | 'BREAD'
}
function ToPanel({
  inputValue, balanceReadings, tokenType,
}: IProps) {
  return (
    <PanelContainer>
      <PanelHeader>
        <PanelBalance>
          <TokenBalance
            readings={balanceReadings}
          />
        </PanelBalance>
      </PanelHeader>
      <PanelContent>
        <span className="bg-breadgray-100 text-lg sm:text-2xl truncate overflow-ellipsis w-0 flex-auto">
          {inputValue || '00.00'}
        </span>
        <Icon type={tokenType} />
        <span className="ml-4 w-20 pt-0.5">{tokenType}</span>
      </PanelContent>

    </PanelContainer>
  );
}

export default ToPanel;
